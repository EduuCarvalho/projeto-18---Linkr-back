import connectionDB from "../database/database.js";
import { timelinePostModel } from "../models/timelineModel.js";

export async function timelinePostValidation(req, res, next) {
    const { url, description } = req.body;
    const userId = req.user;

    const { error } = timelinePostModel.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    if (url.substr(0, 8) !== 'https://') {
        return res.status(422).send('Invalid url. Expect "https://"');
    }

    if (!description){
        req.description = '';
    }else{
        req.description = description;
    }

    try {
        
        await connectionDB.query(`
            INSERT INTO links(user_id, url)
            VALUES ($1, $2)
        `,
            [userId, url]
        );

        const linkId = await connectionDB.query(`
            SELECT id 
            FROM links 
            WHERE user_id = $1
            ORDER BY id DESC
            LIMIT 1
        `,
            [1]
        );

        req.linkId = linkId.rows[0].id;

        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}