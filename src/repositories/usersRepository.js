import connectionDB from "../database/database.js";

export function searchUsers(pattern) {
  return connectionDB.query(
    "SELECT id, name, picture_url FROM users WHERE name LIKE $1",
    [pattern + "%"]
  );
}
