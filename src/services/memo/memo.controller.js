import commonResponse from "../../helpers/commonResponse";
import { todaysFolder } from "../../helpers/multer";
import memoService from "./memo.services";
import fs from "fs";
import sharp from "sharp";
import path from "path";

const memoController = {
    createMemo: async (req, res) => {   
             
        for (const [key, value] of Object.entries(req.body)) {            
            if (typeof (value) === 'string')
              req.body[key] = value            
        };
        
        let {toDo, user} = req.body;
        user = JSON.parse(user);
        req.body.user = user;
        
        //if memo have images
        req.body.images = [];
        if (req.files != undefined && req.files.images != undefined && req.files.images.length > 0){            
            const dateFolder = todaysFolder(user).todaysFolder;
            const uploadFolder = todaysFolder(user).UploadDir;
            
            let validImages = [];
            for(let row of req.files.images){
                row.originalname = req.files.images[0].originalname;
                row.image_path = process.env.DOMAIN_URL + 
                    `/users/${user.email}` + dateFolder + "/" + req.files.images[0].filename;
                row.thumbnail_path = process.env.DOMAIN_URL + 
                    `/users/${user.email}` + dateFolder + "/thumbnails/" + req.files.images[0].filename;
                row.original_size = req.files.images[0].size;
                
                validImages.push(row);
            };//for

            // 썸네일 이미지 만들기
            if(!fs.existsSync(`${uploadFolder}/thumbnails`))
                fs.mkdirSync(`${uploadFolder}/thumbnails`);
            
            for(let row of req.files.images){
                await sharp(row.path)
                    .resize(150, 150,{fit:"contain"}) 
                    .toFormat("jpeg")
                    .jpeg({
                    quality: 100
                    })
                    .toFile(path.resolve(uploadFolder, 'thumbnails', row.filename));
                
                          
            }//for
            req.body.images = validImages;
        };//if
        const data = {...req.body};
        console.log(data);
        const images = req.body.images ? req.body.images : "";
        
        let memo;
        try {
            memo = await memoService.create(user.id, toDo, images);    
            if(memo)
                return commonResponse.success(res, 200, memo);
        } catch (error) {
            return commonResponse.error(res, 400, "메모를 저장하지 못했습니다.");
        };
    },

    getMemo: async (req, res) => {
        const {user_id} = req.body;
        const memos = await memoService.getAllMemo(user_id);
        
        if(memos)
            return commonResponse.success(res, 200, memos);
        else
            return commonResponse.error(res, 400, "메모를 불러오지 못했습니다.");
    },
};

export default memoController;