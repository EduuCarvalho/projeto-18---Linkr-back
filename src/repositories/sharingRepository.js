import connectionDB from "../database/database.js";

export function insertSharing(userId, postId) {
  return connectionDB.query(
    "INSERT INTO shares (post_id, user_id) VALUES ($1, $2)",
    [postId, userId]
  );
}

export async function deleteAllsharingPost(postId) {
  return connectionDB.query(
      `DELETE FROM shares WHERE post_id = $1;`,
      [postId]
  );
}

export async function findWhoShared(){
  return connectionDB.query(`
    SELECT s.user_id as who_shared_id,
        u.name as who_shared_name
    FROM shares s
      JOIN users u
        ON s.user_id = u.id
  `);
}

export async function findRepostsNumber(){
  return connectionDB.query(`
    SELECT p.id as post_id,
        COUNT(s.id) AS total_reposts
    FROM posts p
      LEFT JOIN shares s
        ON p.id = s.post_id
    GROUP BY p.id 
  `);
}