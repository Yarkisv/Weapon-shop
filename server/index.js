import express, { json } from 'express'
import dotenv from 'dotenv'
import connection from './db_config.js';
import router from './routes.js';

dotenv.config();

const PORT = process.env.SERVER_PORT

const app = express();

app.use(express.json());

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

