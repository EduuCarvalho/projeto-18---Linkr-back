import {v4 as uuidV4} from "uuid";
import connectionDB from "../database/database.js";
import bcrypt from "bcrypt"


export async function postSignIn(req,res){

    const user = res.locals.user;
    const token = uuidV4();
1     
    try{
        await connectionDB.query(
            `INSERT INTO sessions (token, user_id) VALUES ($1,$2);`,[token,user.id]
        )
        res.status(200).send({token:token,name:user.name,picture_url :user.picture_url });

    }catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}

export async function postSignUp(req,res) {

    const {email, password , name, pictureurl} = req.body;

 const cryptedPassword = bcrypt.hashSync(password,10); 
 console.log(cryptedPassword,"cryptedPassword")
    try{
        
        await connectionDB.query(
            `INSERT INTO users (email, password, name, picture_url)
            VALUES ($1,$2,$3,$4);`,
            [email, cryptedPassword,name,pictureurl])
          
            res.status(201).send("Cadastro feito com sucesso!!!")
        
    }catch (err) {
        console.log(err,"ERRORR")
        res.sendStatus(500)
    }
    
}