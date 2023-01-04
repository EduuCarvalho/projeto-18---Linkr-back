import { signInSchema } from "../models/logInModels.js";
import { checkEmail } from "../repositories/logInRepository.js";
import bcrypt from "bcrypt";



export const signInValidations = async (req,res,next)=>{
    console.log("to aki")
    const { email, password } = req.body;

    const { errors } = signInSchema.validate({ email, password},{abortEarly:false})

    if(errors){
        return res.status(422).send({message:errors}); 
    }

    const confirmEmail =  await checkEmail(email)

    const userPassword = bcrypt.compareSync(password,confirmEmail.rows[0].password)
    if (confirmEmail.rows.lenght===0 || !userPassword) {
        return res.sendStatus(401)
    }
    res.locals.user=confirmEmail.rows[0];

    next();

}