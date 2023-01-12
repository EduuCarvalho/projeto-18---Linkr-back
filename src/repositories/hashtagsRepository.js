import connectionDB from "../database/database.js";
import urlMetadata from 'url-metadata';

export async function deleteHashtagsPost(postHashtagsId) {
    return connectionDB.query(
        `DELETE FROM post_hashtags WHERE id = $1;`,
        [postHashtagsId]
    );
}

export async function deleteAllHashtagsPost(postId) {
    return connectionDB.query(
        `DELETE FROM post_hashtags WHERE post_id = $1;`,
        [postId]
    );
}

export async function insertHashtagsPost(postId, hashtag) {
    let hashtagId;

    const hashtagExists = await connectionDB.query(
        `SELECT id FROM hashtags WHERE LOWER(name) = LOWER($1);`,
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

export async function selectHashtagsPost(postId) {
    return connectionDB.query(
        `SELECT h.name, ph.id AS post_hashtags_id
        FROM post_hashtags ph
        JOIN hashtags h ON ph.hashtag_id = h.id
        WHERE ph.post_id = $1;`,
        [postId]
    );
}

export async function selectPostsByHashtag(hashtag, ref) {
    const completePosts = [];

    const hashtagExists = await connectionDB.query(
        `SELECT id FROM hashtags WHERE LOWER(name) = LOWER($1);`,
        [hashtag]
    );

    if (hashtagExists.rowCount) {
        const hashtagId = hashtagExists.rows[0].id;

        const posts = await connectionDB.query(
            `SELECT
                p.id,
                p.description,
                u.name,
                u.picture_url,
                u.id AS "ownerId",
                l.url,
                COALESCE(s.user_id, NULL) AS "who_shared_id",
                COUNT(s.post_id) AS shares,
                COALESCE(COUNT(c.id), 0) as "total_comments"
            FROM posts p
            JOIN post_hashtags ph ON ph.post_id = p.id
            JOIN users u ON p.user_id = u.id
            JOIN links l ON p.link_id = l.id
            LEFT JOIN shares s ON s.post_id = p.id
            LEFT JOIN comments c ON c.post_id = p.id
            WHERE ph.hashtag_id = $1 AND p.id < $2 AND (u.id = s.user_id OR s.user_id IS NULL)
            GROUP BY p.id, u.name, u.picture_url, u.id, l.url, s.user_id
            ORDER BY p.id DESC
            LIMIT 20;`,
            [hashtagId, ref]
        );

        const likes = await connectionDB.query(`
            SELECT u.name, 
                l.post_id
            FROM likes as l
                JOIN users as u
                    ON l.user_id = u.id
        `);

        for (let i = 0; i < posts.rows.length; i++) {
            const postLikes = [];

            if (likes.rowCount > 0) {
                for (let j = 0; j < likes.rows.length; j++) {
                    if (posts.rows[i].id === likes.rows[j].post_id) {
                    postLikes.push(likes.rows[j].name);
                    }
                }
            }

            await urlMetadata(posts.rows[i].url).then(response => {
                completePosts.push({
                    ...posts.rows[i],
                    linkTitle: response.title,
                    linkDescription: response.description,
                    linkImg: response.image,
                    likes: [...postLikes]
                });
            }
            );
        }
    }

    return completePosts;
}
