import connectionDB from "../database/database.js";

export async function insertLike(postId, userId) {
    return await connectionDB.query(`
        INSERT INTO likes (post_id, user_id)
        VALUES ($1, $2)
    `,
        [postId, userId]
    );
}

export async function deleteFromLike(postId, userId) {
    return await connectionDB.query(`
        DELETE 
        FROM likes
        WHERE user_id = $1 AND post_id = $2
    `,
        [userId, postId]
    );
}

export async function deleteAllLikesPost(postId) {
    return await connectionDB.query(
        `DELETE FROM likes WHERE post_id = $1;`,
        [postId]
    );
}