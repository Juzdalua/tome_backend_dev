import db from "../../helpers/db";
const User = db.users;

const userService = {
    createUser : async (data) => {

        // const ok =  await User.findAll();
        // console.log(ok)

        const createInfo = await User.create(
            data, 
            {
                raw:true,
                plain:true,
                returning:true,
            }
        );
        if(!!createInfo.dataValues)
            return createInfo[1];
        return false;    
    },

    //join validation - email / username
    validUser : async (data) => {    
        
        const isExist = await User.findOne({
            where: data        
        },{       
            raw:true,
        });    
        
        if(isExist === null) // email is available
            return true;
        else
            return false;
    },

    //find User
    findUser : async(data) => {
        const user = await User.findOne({
            where: {email: data.email}
        },{
            //options
            raw: true,
        });
        if(user)
            return user;
        else
            return false;
    },

    //login kakao
    loginKakao : async(username, email) => {
        try {
            let [user, created] = await User.findOrCreate({
                where: {email:email},
                defaults: {
                    is_social: true,
                    social_type: "Kakao",
                    username
                }
            },);    
            
            if(user.username !== username){
                await User.update({
                    username: username
                }, {
                    where: {email: email}
                });
                user.username = username;                      
        }// if
        return user; 
        } catch (error) {
            console.log("error", error)
            return error;       
        }
         
    },
};
export default userService;