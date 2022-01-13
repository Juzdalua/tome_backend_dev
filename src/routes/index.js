import rootRouter from "../services/root/root.route"

const init = (app) => {
    app.use("/api/join", rootRouter);
};

export default init;