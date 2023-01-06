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

async function selectPostsByHashtag(hashtag) {
    const completePosts = [];

    const posts = await connectionDB.query(
        `SELECT
            p.id,
            p.description,
            u.name,
            u.picture_url,
            l.url
        FROM posts p
        JOIN post_hashtags ph ON ph.post_id = p.id
        JOIN hashtags h ON ph.hashtag_id = h.id
        JOIN users u ON p.user_id = u.id
        JOIN links l ON p.link_id = l.id
        WHERE LOWER(h.name) = LOWER($1)
        ORDER BY id DESC
        LIMIT 20;`,
        [hashtag]
    );

    const likes = await connectionDB.query(`
        SELECT u.name, 
            l.post_id
        FROM likes as l
            JOIN users as u
                ON l.user_id = u.id
    `);

    posts.rows.map((item) => {
        const postLikes = [];

        if (likes.rowCount > 0) {
            for (let i = 0; i < likes.rows.length; i++) {
                if (item.id === likes.rows[i].post_id) {
                    
                    postLikes.push(likes.rows[i].name);
                }
            }
        }

        completePosts.push({ ...item, likes: [...postLikes] });
    });

    return completePosts;
}

export const hashtagsRepository = {
    dropHashtagsPost,
    dropAllHashtagsPost,
    insertHashtagsPost,
    selectHashtagsPost,
    selectPostsByHashtag
};
