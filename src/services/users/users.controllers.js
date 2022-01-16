import bcrypt from "bcrypt";
import {createUser} from "./users.services";

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
    // console.log(data)
    
    let create;
    try {
        create = await createUser(data);      
    } catch (error) {
        console.log(`error: ${error}`);
        return null;
    }

    return res.json("success");
};

export const validJoin = (req, res) => {

    return res.json("success validation");
};