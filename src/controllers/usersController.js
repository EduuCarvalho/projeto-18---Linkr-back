import { selectFollowing } from "../repositories/followingRepository.js";
import { findRepostsNumber } from "../repositories/sharingRepository.js";
import { searchUsers, selectUser, selectUserPosts } from "../repositories/usersRepository.js";
import { hashRepostsNumber } from "../utils/sharingUtils.js";

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
  const userId = req.user;
  const ref = req.ref;

  try {
    const { rows } = await selectUser(id);
    const [user] = rows;
    if (!user){
      res.status(404).send({ message: "The user doesn't exist!" });
      return;
    }
    const posts = await selectUserPosts(id, ref);
    const { rows : shares } = await findRepostsNumber();
    const { rows: following } = await selectFollowing(id, userId);
    const sharesHash = {...hashRepostsNumber(shares)};
    res.status(200).send({username: user.name, posts, sharesHash, isFollowing: following.length !== 0});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
