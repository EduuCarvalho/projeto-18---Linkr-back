import connectionDB from "../database/database.js";

async function insertHashtagsPost(postId, hashtag) {
    let hashtagId;

    const hashtagExists = await connectionDB.query(
        `SELECT id FROM hashtags WHERE name = $1;`,
        [hashtag]
    );

    if (hashtagExists.rowCount) {
        hashtagId = hashtagExists.rows[0].id;
    } else {
        const { rows } = await connectionDB.query(
            `INSERT INTO hashtags (name) VALUES ($1) RETURNING id;`,
            [hashtag]
        );

        hashtagId = rows[0].id;
    }

	return connectionDB.query(
        `INSERT INTO post_hashtags (post_id, hashtag_id) VALUES ($1, $2);`,
        [postId, hashtagId]
    );
}

export const hashtagsRepository = { insertHashtagsPost };
