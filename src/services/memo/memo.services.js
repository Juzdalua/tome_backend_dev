import db from "../../helpers/db";
const Memo = db.memos;

const memoService = {
    create: async (user_id, toDo, images) => {
        const memo = await Memo.create({
            user_id,
            memo: toDo,
            images : images.length>0 ? images : ""
        });
        return memo;
    },

    getAllMemo: async (user_id) => {        
        const memos = await Memo.findAll({
            where: {user_id},
            order: [
                ["id", "DESC"],
            ]
        });
        return memos;        
    },

    deleteMemo: async (id) => {
        const memo = await Memo.destroy({
            where: {id}
        });
        return memo;
    },
};

export default memoService;