import Model from "./users.model";

export const createUser = async (data) => {
    const createInfo = await Model.create(
        data, 
        {raw:true}
    );
    console.log(createInfo)
    if(!!createInfo.dataValues)
        return createInfo.toJSON();
    return false;    
};