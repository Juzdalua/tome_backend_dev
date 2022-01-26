import multer from "multer";
import path from "path";
import fs from "fs";
import commonResponse from "./commonResponse";

//make upload folder with date section
export const todaysFolder = (user) => {
    const date = new Date();
    
    //make today`s folder
    if(!fs.existsSync("public"))
        fs.mkdirSync("public");

    if(!fs.existsSync(`public/users`))
        fs.mkdirSync(`public/users`);

    if(!fs.existsSync(`public/users/${user.email}`))
        fs.mkdirSync(`public/users/${user.email}`);
        
    if(!fs.existsSync(`public/users/${user.email}/${date.getUTCFullYear()}`))
        fs.mkdirSync(`public/users/${user.email}/${date.getUTCFullYear()}`)
    
    if(!fs.existsSync(`public/users/${user.email}/${date.getUTCFullYear()}/${date.getUTCMonth()+1}`))
        fs.mkdirSync(`public/users/${user.email}/${date.getUTCFullYear()}/${date.getUTCMonth()+1}`)
            
    if(!fs.existsSync(`public/users/${user.email}/${date.getUTCFullYear()}/${date.getUTCMonth()+1}/${date.getUTCDate()}`))
        fs.mkdirSync(`public/users/${user.email}/${date.getUTCFullYear()}/${date.getUTCMonth()+1}/${date.getUTCDate()}`)

    const todaysFolder = `/${date.getUTCFullYear()}/${date.getUTCMonth()+1}/${date.getUTCDate()}`;
        
    const UploadDir = path.join(
        __dirname,
        `../../public/users/${user.email}`,
        todaysFolder
    );
    
    console.log(`##### UploadDir: ${UploadDir}`)
    return {
    UploadDir,
    todaysFolder
    };
};

//setting upload path
function infoUploadDirPath(user) {
    return todaysFolder(user).UploadDir
}; 


let imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, infoUploadDirPath(JSON.parse(req.body.user)));
        console.log(`###`,infoUploadDirPath(JSON.parse(req.body.user)));
    },
    filename: function (req, file, cb) {
        //cb(null, Date.now()+ '_' + file.originalname);
        
        // 확장자 구분
        let exploded_name = file.originalname.split('.');
        let ext = exploded_name[exploded_name.length - 1];
        cb(null, Date.now() + '_' + exploded_name[0] + '.' + ext);        
    }
});

//multer setting
const infoImageUpload = multer({
    storage: imageStorage,
    limits: {
        files: 5,
        fileSize: 1000000 * 10 , // 10 MB
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
        // return cb(new Error("resData"));
        return cb(new Error('JPG,JPEG,PNG 확장자만 업로드 가능합니다.')); 
        }
        return cb(null, true);
    }
    }).fields([{ name: 'images'}]);


//file upload
const uploadMiddleware = (req, res, next) => {         
    var handler = infoImageUpload; 
    handler(req, res, function(err){                
        if(err)
            return commonResponse.error(res, 400, err.message);                                  
        next();
    });
};

export default uploadMiddleware;