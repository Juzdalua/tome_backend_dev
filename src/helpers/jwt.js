import jwt from "jsonwebtoken";
import commonResponse from "./commonResponse";

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
export const userAurhorize = (req, res, next) => {
    try {
        const isVerify = verifyJWT(req.res);
        console.log(`isVerify: `,isVerify);

        if (isVerify){

            next();
        } else 
            return commonResponse.unAuthentication(res, {}, '유효하지 않은 키입니다.');
    } catch (error) {
        console.log(`JWT Verify Error2: `, error);
        return commonResponse.unAuthentication(res, 401, error);
    };
};