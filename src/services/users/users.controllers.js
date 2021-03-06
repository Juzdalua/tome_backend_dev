import bcrypt from "bcrypt";
import fetch from "node-fetch";
import {createUserToken} from "../../helpers/jwt";
import userService from "./users.services";

import commonResponse from "../../helpers/commonResponse";

const userController = {
    //create User
    createJoin: async (req, res) => {
        const {email, password, password2, username} = req.body;

        if(password !== password2){
            return commonResponse.error(res, 400, "비밀번호가 다릅니다.");
        }// if

        //bcrypt hash
        const saltRound = 5;
        const hash = await bcrypt.hashSync(password, saltRound);
        
        // const ok = await bcrypt.compareSync(password, hash)
        
        const data = {
            email, 
            password: hash, 
            username
        };
                
        let create;
        try {
            create = await userService.createUser(data);      
            return commonResponse.success(res, 200, create)
        } catch (error) {
            console.log(`error: ${error}`);
            return commonResponse.error(res, 400);
        }

    },

    // validation email, username before create User(join)
    validJoin: async (req, res) => {
        const {email, username} = req.body;
        if(username === undefined){
            //email validation
            const emailOk = await userService.validUser({email: email});
            
            if(emailOk) // email available
                return commonResponse.success(res, 200, emailOk);
            else
                return commonResponse.error(res, 400, "Email이 이미 존재합니다.");

        } else if(email === undefined){
            //username validation
            const usernameOk = await userService.validUser({username: username});
            
            if(usernameOk) // username available
                return commonResponse.success(res, 200, usernameOk);
            else
                return commonResponse.error(res, 400, "닉네임이 이미 존재합니다.");
        }; //if

    },

    //login User
    loginUser: async(req,res) => {                
        const query = {
            where: {email: req.body.email}
        };
        const user = await userService.findUser(query);

        if(user === false){
            return commonResponse.error(res, 400, "계정이 존재하지 않습니다.");
        }else{
            if(user.is_social)
                return commonResponse.error(res, 400, "소셜로그인으로 진행해주세요.");

            const {password} = req.body;
            const passwordOk = await bcrypt.compareSync(password, user.password);
            if(!passwordOk){
                return commonResponse.error(res, 400, "비밀번호가 다릅니다.");
            } else{
                const token = createUserToken(user);
                user.dataValues.token = token.token;            
                    
                return commonResponse.success(res, 200, user);
            };
        };    
    },

    //social login Kakao
    // loginUserKakao: async(req,res) => {
    //     const {code} = req.query;
    //     const grant_type = "authorization_code";
    //     const redirect_uri = "http://localhost:4001/api/users/login/kakao";

    //     const response = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}&code=${code}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
    //         }
    //     });
    //     const json = await response.json();
    //     console.log(json)

    //     const props = await fetch(`https://kapi.kakao.com/v2/user/me`,{
    //         method: "GET",
    //         headers: {
    //             "Authorization": `Bearer ${json.access_token}`,
    //             "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //     });
    //     const user = await props.json();
    //     console.log(user)
        
    //     const username = user.kakao_account.profile.nickname;
    //     const email = user.kakao_account.email;

    //     // email valadation
    //     if(!email){
    //         fetchResponse = {
    //             error: true,
    //             statusCode: 400,
    //             messageCode: 'BAD REQUEST',
    //             message: "이메일 동의는 필수입니다."
    //         };            
    //     }else{
    //         const registerUser = await userService.loginKakao(username, email);
    //         fetchResponse = {
    //             error: true,
    //             statusCode: 400,
    //             messageCode: 'BAD REQUEST',
    //             message: "이메일 동의는 필수입니다.",
    //             user: registerUser
    //         };            
    //     }// if
    //     await fetch("", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             payload: fetchResponse                    
    //         }
    //     });
    // },
    loginUserKakao: async (req, res) => {
        const {kakao_token} = req.body;
        
        const props = await fetch(`https://kapi.kakao.com/v2/user/me`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${kakao_token.access_token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const user = await props.json();
        
        const username = user.kakao_account.profile.nickname;
        const email = user.kakao_account.email;
                
        //email validation
        if(!email){
            //disconnect kakao to receive email
            const disconnect = await fetch(`https://kapi.kakao.com/v1/user/unlink`,{
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${kakao_token.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return commonResponse.error(res, 400, "Email을 제공해야 가입이 가능합니다.");
        }
        
        const registerUser = await userService.loginKakao(username, email);
        
        const token = createUserToken(registerUser);        
        registerUser.dataValues.token = token.token;
        registerUser.dataValues.kakao_token = kakao_token;
        
        return commonResponse.success(res, 200, registerUser);        
    },

    //logout Kakao
    logoutUserKakao : async (req, res) => {
        const {access_token} = req.body;
        const response = await fetch('https://kapi.kakao.com/v1/user/logout', {
            headers: {
                        "Authorization": `Bearer ${access_token}`,
                    },
        });
        return commonResponse.success(res, response.status, response);
    },

    //user change password
    changePassword: async (req, res) => {
        const {user_id, password, password2} = req.body;
        if(password !== password2){
            return commonResponse.error(res, 400, "비밀번호가 다릅니다.");
        }// if

        const query = {where: {id: user_id}}
        const user = await userService.findUser(query);
        
        if(!user)
            return commonResponse.error(res, 400, "사용자가 존재하지 않습니다.");
        if(user.is_social)
            return commonResponse.error(res, 400, "소셜로그인은 비밀번호 설정이 불가능합니다.");

        const samePassword = await bcrypt.compareSync(password, user.password);
        if(samePassword)
            return commonResponse.error(res, 400, "같은 비밀번호로는 변경이 불가합니다.");

        //bcrypt hash
        const saltRound = 5;
        const hash = await bcrypt.hashSync(password, saltRound);

        const data = {
            id: user_id,
            password: hash
        };

        const response = await userService.changePassword(data);
        // console.log(response[0], typeof response[0])
        if(response[0] === 1)
            return commonResponse.success(res, 200, response[0]);
        else
            return commonResponse.error(res, 400, "비밀번호 변경에 실패했습니다..");
                
    },
};

export default userController;