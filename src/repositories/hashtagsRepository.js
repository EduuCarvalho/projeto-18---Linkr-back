import connectionDB from "../database/database.js";

async function dropHashtagsPost(postHashtagsId) {
    return connectionDB.query(
        `DELETE FROM post_hashtags WHERE id = $1;`,
        [postHashtagsId]
    );
}

async function dropAllHashtagsPost(postId) {
    return connectionDB.query(
        `DELETE FROM post_hashtags WHERE post_id = $1;`,
        [postId]
    );
}

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

async function selectHashtagsPost(postId) {
    return connectionDB.query(
        `SELECT h.name, ph.id AS post_hashtags_id
        FROM post_hashtags ph
        JOIN hashtags h ON ph.hashtag_id = h.id
        WHERE ph.post_id = $1;`,
        [postId]
    );
}

export const hashtagsRepository = { dropHashtagsPost, dropAllHashtagsPost, insertHashtagsPost, selectHashtagsPost };
