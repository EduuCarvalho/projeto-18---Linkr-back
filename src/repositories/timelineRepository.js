import connectionDB from "../database/database.js";

export async function insertPost(userId, linkId, description){
    return connectionDB.query(`
        INSERT INTO posts (user_id, link_id, description)
        VALUES ($1, $2, $3)
    `,
        [userId, linkId, description]
    );
}