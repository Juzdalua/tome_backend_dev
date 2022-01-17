import bcrypt from "bcrypt";
const User = require("./users.services");
const commonResponse = require("../../helpers/commonResponse");

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
        create = await User.createUser(data);      
        return commonResponse.success(res, 200, create)
    } catch (error) {
        console.log(`error: ${error}`);
        return commonResponse.error(res, 400);
    }

};

export const validJoin = async (req, res) => {
    const {email, username} = req.body;
    if(username === undefined){
        //email validation
        const emailOk = await User.validUser({email: email});
        
        if(emailOk) // email available
            return commonResponse.success(res, 200, emailOk);
        else
            return commonResponse.error(res, 400, "Email이 이미 존재합니다.");

    } else if(email === undefined){
        //username validation
        const usernameOk = await User.validUser({username: username});
        
        if(usernameOk) // username available
            return commonResponse.success(res, 200, usernameOk);
        else
            return commonResponse.error(res, 400, "닉네임이 이미 존재합니다.");
    }; //if

};