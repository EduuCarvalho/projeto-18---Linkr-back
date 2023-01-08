import { signInSchema, SignUpSchema } from "../models/logInModels.js";
import { checkEmail } from "../repositories/logInRepository.js";
import bcrypt from "bcrypt";

export const signInValidations = async (req,res,next)=>{
    const { email, password } = req.body;

    const confirmEmail =  await checkEmail(email)

    if(confirmEmail.rows.length===0){
        return res.status(404).send("email não cadastrado")
    }

    const { errors } = signInSchema.validate(email, password,{abortEarly:false})

    if(errors){
        const error = error.details.map((detail)=>detail.message)
        return res.status(422).send(error); 
    }

    const userPassword = bcrypt.compareSync(password,confirmEmail.rows[0].password)
    if (confirmEmail.rows.lenght===0 || !userPassword) {
        return res.status(401).send("senha e email não compativeis")
    }

    res.locals.user=confirmEmail.rows[0];

    next();

}

export const signUpValidations = async (req,res,next)=>{

    const {email, password, name, pictureurl} = req.body;

    const { error } = SignUpSchema.validate({email, password, name, pictureurl},{abortEarly:false});

    if(error){
        const errors = error.details.map((detail)=>detail.message);
        return res.status(422).send(errors);
    }

    const confirmEmail = await checkEmail(email);    

    if(confirmEmail.rows.length>0){
        return res.status(409).send({message:"email já cadastrado"})
    }

    next();
}