import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connectionDB = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

export default connectionDB;