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
            type:type.STRING,
            allowNull: false
        },
        username:{
            type:type.STRING,
            allowNull: false,
            unique: true,
        },
    },{
        timestamps: true,
        paranoid: true,
        override: true,
        // tableName: 
    })
};

export default User;