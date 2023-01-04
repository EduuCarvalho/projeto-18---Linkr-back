import connectionDB from "../database/database.js";

export async function checkEmail (email){
return connectionDB.query(
    `SELECT * FROM users WHERE email=$1;`,[email]);
}