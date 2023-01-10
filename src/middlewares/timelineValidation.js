import urlMetadata from "url-metadata";
import connectionDB from "../database/database.js";
import { timelinePostModel } from "../models/timelineModel.js";

export async function timelinePostValidation(req, res, next) {
    const { url, description } = req.body;

    const { error } = timelinePostModel.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    if (url.substr(0, 8) !== 'https://' && url.substr(0, 7) !== 'http://') {
        return res.status(422).send('Invalid url. Expect "https://" or "http://"');
    }

    if (!description) {
        req.description = '';
    } else {
        req.description = description;
    }

    try {

        const linkExists = await connectionDB.query(`
            SELECT * 
            FROM links
            WHERE url = $1
        `,
            [url]
        );

        if (linkExists.rowCount === 0) {
            const test = await urlMetadata(url);

            await connectionDB.query(`
                INSERT INTO links(url)
                VALUES ($1)
            `,
                [url]
            );

            const linkId = await connectionDB.query(`
                SELECT id 
                FROM links 
                WHERE url = $1
            `,
                [url]
            );

            req.linkId = linkId.rows[0].id;

        } else {
            req.linkId = linkExists.rows[0].id;
        }


    } catch (err) {
        if (err.code === 'ENOTFOUND') {
            return res.status(422).send('Invalid url');
        }

        console.log(err);
        return res.sendStatus(500);
    }

    next();
}

export async function countTimelinePostsValidation(req, res, next) {
    const { postId } = req.params;

    for (let i = 0; i < postId.length; i++) {
        if (isNaN(parseInt(postId[i]))) {
            return res.sendStatus(400);
        }
    }

    next();
}