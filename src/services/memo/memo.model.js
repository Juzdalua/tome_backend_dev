const Memo = (sequelize, type) => {
    return sequelize.define('memos', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        memo: {
            type: type.STRING,
            allowNull: false,
        },
        images: {
            type: type.JSONB,            
        },
        // is_deleted: {
        //     type:type.BOOLEAN,
        //     defaultValue: false,
        // },
    },{
        //oprions
        timestamps: true,
        paranoid: true,
        override: true,
    });
};

export default Memo;