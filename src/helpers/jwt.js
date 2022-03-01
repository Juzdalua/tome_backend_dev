import jwt from "jsonwebtoken";
import commonResponse from "./commonResponse";
import userServices from "../services/users/users.services";

//create token
export const createUserToken = (user) => {
    
    const payload = {
        email: user.email,
        username: user.username
    };
    
    const token = jwt.sign(user.email, process.env.JWT_SECRET);
    payload.token = token;
    
    return payload;
};

//verify JWT
export const verifyJWT = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer","").trim();
        console.log(`token ===> `, token);
        const userInfo = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userInfo;
        console.log(`userInfo ===> `, userInfo);
        return true;        
    } catch (error) {
        console.log(`JWT Verify Error1: `, error);
        return false;
    };
};

//is Authorized
export const userAurhorize = async (req, res, next) => {
    try {
        const isVerify = verifyJWT(req, res);
        console.log(`isVerify: `,isVerify);

        if (isVerify){
            const query = {
                where: {email: req.user}
            };
            const user = await userServices.findUser(query);
            // console.log(user)
            if(user)
                next();
            else
                return commonResponse.unAuthentication(res, {}, '잘못된 사용자입니다.');
        } else 
            return commonResponse.unAuthentication(res, {}, '유효하지 않은 키입니다.');
    } catch (error) {
        console.log(`JWT Verify Error2: `, error);
        return commonResponse.unAuthentication(res, 401, error);
    };
};