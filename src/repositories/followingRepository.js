import connectionDB from "../database/database.js";

export function insertFollowing(userId, followerId){
    return connectionDB.query(
        "INSERT INTO following (user_id, follower_id) VALUES ($1, $2)",
        [userId, followerId]
      );
}

export function deleteFollowing(userId, followerId) {
  return connectionDB.query(
      `DELETE FROM following WHERE user_id = $1 AND follower_id = $2;`,
      [userId, followerId]
  );
}

export function selectFollowing(userId, followerId){
  return connectionDB.query(
    `SELECT * FROM following WHERE user_id = $1 AND follower_id = $2;`,
    [userId, followerId]
);
}