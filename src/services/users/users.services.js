import db from "../../helpers/db";
const User = db.users;

export const createUser = async (data) => {

    // const ok =  await User.findAll();
    // console.log(ok)

    const createInfo = await User.create(
        data, 
        {
            raw:true,
            plain:true
        }
    );
    if(!!createInfo.dataValues)
        return createInfo.toJSON();
    return false;    
};