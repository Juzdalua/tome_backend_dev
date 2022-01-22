import Sequelize from "sequelize";
import Memo from "../services/memo/memo.model";
import User from "../services/users/users.model";

const sequelize = new Sequelize(
    process.env.DB_NAME,            //db명
    process.env.DB_USER,            //username
    process.env.DB_PASS,            //password
    {
        host: process.env.DB_HOST,  //host
        dialect: 'postgres',        //db종류        
    }
);

const checkDBServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

checkDBServer();

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//db모듈 가져오기
db.users = User(sequelize, Sequelize);
db.memos = Memo(sequelize, Sequelize);

//관계 설정
db.users.hasMany(db.memos, {foreignKey: "user_id"});
db.memos.belongsTo(db.users, {foreignKey: "user_id"});

//테이블 생성 및 변경
db.users.sync({force:false, alter:true});
db.memos.sync({force:false, alter:true});

export default db;