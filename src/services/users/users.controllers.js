import bcrypt from "bcrypt";
import userServices from "./users.services";

export const createJoin = async (req, res) => {
    const {email, password, username} = req.body;

    //bcrypt hash
    const saltRound = 5;
    const hash = await bcrypt.hashSync(password, saltRound);
    
    // const ok = await bcrypt.compareSync(password, hash)
    // console.log(ok)

    const data = {
        email, 
        password: hash, 
        username
    };
    const create = await userServices.createUser(data);
    console.log(create)
    
    
    return res.json("success");
};

export const validJoin = (req, res) => {

    return res.json("success validation");
};