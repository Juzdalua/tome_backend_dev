import commonResponse from "../../helpers/commonResponse";
import memoService from "./memo.services";

const memoController = {
    createMemo: async (req, res) => {
        // const {toDo, user, file} = req.body;
        console.log(req.body) 
        console.log(req.file)
        console.log(req.files)                      
        const memo = await memoService.create(user.id, toDo);
                
        if(memo)
            return commonResponse.success(res, 200, memo);
        else
            return commonResponse.error(res, 400, "메모를 저장하지 못했습니다.");
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