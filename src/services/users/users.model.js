const User = (sequelize, type) => {
    return sequelize.define('users',{    
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },    
        email:{
            type:type.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type:type.STRING            
        },
        username:{
            type:type.STRING,
            allowNull: false,
        },
        is_social:{
            type:type.BOOLEAN,
            defaultValue: false
        },
        social_type:{
            type:type.STRING,
            default:"Web"
        }
    },{
        timestamps: true,
        paranoid: true,
        override: true,
        // tableName: 
    })
};

export default User;