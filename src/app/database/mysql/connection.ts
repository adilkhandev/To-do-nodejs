import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DATABASE_USERNAME,
    password: '',
    database: 'to-do'
});


export { connection as DBCLient}
