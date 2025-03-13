import mysql from "mysql2"
import dotenv from 'dotenv'

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // юзера меняем если надо
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

connection.connect( (err) => { 
    if (err) { console.error("Database connection failed");}
    else{ console.log(`Database connected on port ${process.env.DB_PORT}`);}
});

export default connection;