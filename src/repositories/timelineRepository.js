import connectionDB from "../database/database.js";

export async function insertPost(userId, linkId, description) {
    return connectionDB.query(`
        INSERT INTO posts (user_id, link_id, description)
        VALUES ($1, $2, $3)
    `,
        [userId, linkId, description]
    );
}

export async function getPosts() {
    const completePosts = [];

    const posts = connectionDB.query(`
        SELECT u.name, u.picture_url, 
            p.id, p.description,
            l.url
        FROM posts as p
            JOIN users as u
                ON p.user_id = u.id
            JOIN links as l
                on p.link_id =l.id
    `);

    const likes = connectionDB.query(`
        SELECT u.name, 
            l.post_id
        FROM likes as l
            JOIN users as u
                ON l.user_id = u.id
    `);

    (await posts).rows.map((item) => {
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