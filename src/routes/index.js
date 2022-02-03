import userRouter from "../services/users/users.route";
import memoRouter from "../services/memo/memo.route";

const init = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/memo", memoRouter);
    
        
};

export default init;