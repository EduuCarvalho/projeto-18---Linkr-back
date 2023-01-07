import { searchUsers, selectUserPosts } from "../repositories/usersRepository.js";

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

export async function getUserPosts(req, res) {
  const { id } = req.params;

  try {
    const posts = await selectUserPosts(id);
    
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
