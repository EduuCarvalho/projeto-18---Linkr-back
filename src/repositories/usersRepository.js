import connectionDB from "../database/database.js";

export function searchUsers(pattern) {
  return connectionDB.query("SELECT * FROM users WHERE name LIKE $1", [
    pattern + "%",
  ]);
}
