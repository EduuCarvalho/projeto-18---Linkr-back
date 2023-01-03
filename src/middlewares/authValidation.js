import connectionDB from "../database/database.js";

export default async function authValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await connectionDB.query(`
        SELECT "user_id"
        FROM sessions
        WHERE token = $1
        `,
            [token]
        );

        if (session.rows.length === 0) {
            return res.sendStatus(401);
        }

        req.user = session.rows[0].user_id;

        next();
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}