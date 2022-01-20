import jwt from "jsonwebtoken";

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
export const verifyToken = (req, res) => {
    
};

//is Authorized