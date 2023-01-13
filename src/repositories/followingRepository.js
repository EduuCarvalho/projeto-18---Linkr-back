import connectionDB from "../database/database.js";

export function insertFollowing(userId, followerId){
    return connectionDB.query(
        "INSERT INTO following (user_id, follower_id) VALUES ($1, $2)",
        [userId, followerId]
      );
}