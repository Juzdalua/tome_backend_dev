import Sequelize from "sequelize";
import { User } from "./model";

const sequelize = new Sequelize(
    'postgres',                 //db명
    process.env.DB_USERNAME,    //username
    process.env.DB_PASSWORD,    //password
    {
        host: 'localhost',      //host
        dialect: 'postgres',    //db종류        
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
async () => {
    await db.users.sync();
};

export default db;