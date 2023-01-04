import {v4 as uuidV4} from "uuid";
import connectionDB from "../database/database.js";


export async function postSignIn(req,res){

    const user = res.locals.user;
    const token = uuidV4();

    try{
        await connectionDB.query(
            `INSERT INTO sessions (token, user_id) VALUES ($1,$2);`,[token,user.id]
        )
        res.sendStatus(200);

    }catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}