
export const User = (sequelize, type) => {
    return sequelize.define('users',{    
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },    
        email:{
            type:type.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type:type.INTEGER,
            allowNull: false
        },
        username:{
            type:type.STRING,
            allowNull: false,
            unique: true,
        }        
    },{
        timestamps: true,
        paranoid: true,
        // tableName: 
    })
};