import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    schema: "tripulaciones",
    });

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('\x1b[42m%s\x1b[0m', "Connection has been established successfully.");
        
    } catch (error) {
        console.log('\x1b[41m%s\x1b[0m', "Unable to connect to the database:", error);
    }
}

testConnection();

export default sequelize;
