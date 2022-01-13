import userRouter from "../services/users/users.route"

const init = (app) => {
    app.use("/api/users/join", userRouter);
};

export default init;