import pg from 'pg';

const { Pool } = pg;

const connectionDB = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'linkr'
})

export default connectionDB;