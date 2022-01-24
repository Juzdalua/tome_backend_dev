import db from "../../helpers/db";
const Memo = db.memos;

const memoService = {
    create: async (user_id, toDo) => {
        const memo = await Memo.create({
            user_id,
            memo: toDo
        });
        return memo;
    },

    getAllMemo: async (user_id) => {        
        const memos = await Memo.findAll({
            where: {user_id}
        });
        
        return memos;        
    },

};

export default memoService;