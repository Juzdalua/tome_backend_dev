import bcrypt from "bcrypt";
const User = require("./users.services");
const commonResponse = require("../../helpers/commonResponse");

//create User
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

// validation email, username before create User(join)
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

//login User
export const loginUser = async(req,res) => {
    const {password} = req.body;
    
    const user = await User.findUser(req.body);
    if(user === false){
        return commonResponse.error(res, 400, "계정이 존재하지 않습니다.");
    }else{
        const passwordOk = await bcrypt.compareSync(password, user.password);
        if(!passwordOk){
            return commonResponse.error(res, 400, "비밀번호가 다릅니다.");
        } else{
            return commonResponse.success(res, 200, user);
        };
    };    
};