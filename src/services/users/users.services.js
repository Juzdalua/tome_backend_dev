import db from "../../helpers/db";
const User = db.users;

export const createUser = async (data) => {

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
};

//join validation - email / username
export const validUser = async (data) => {    
    
    const isExist = await User.findOne({
        where: data        
    },{       
        raw:true,
    });    
    
    if(isExist === null) // email is available
        return true;
    else
        return false;
};

//find User
export const findUser = async(data) => {
    const user = await User.findOne({
        where: {email: data.email}
    },{
        //options
    });
    if(user)
        return user;
    else
        return false;
};