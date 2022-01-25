import commonResponse from "../../helpers/commonResponse";
import memoService from "./memo.services";

const memoController = {
    createMemo: async (req, res) => {
        console.log(req.body)        
        // console.log(Object.entries(req.body))
        // for (const [key, value] of Object.entries(req.body)) {
        //     if (typeof (value) === 'string')
        //       req.body[key] = value
        //       console.log(key, value)
        // };
        const {toDo, user} = req.body;
        
         
        
                
          
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