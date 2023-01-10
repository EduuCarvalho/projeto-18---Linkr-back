import connectionDB from "../database/database.js";

export function insertSharing(userId, postId) {
  return connectionDB.query(
    "INSERT INTO shares (post_id, user_id) VALUES ($1, $2)",
    [userId, postId]
  );
}
