import { searchUsers } from "../repositories/usersRepository.js";

export async function getUsersBySearch(req, res) {
  const { name } = req.query;

  try {
    const { rows: filteredUsers } = await searchUsers(name);

    res.send(filteredUsers);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
