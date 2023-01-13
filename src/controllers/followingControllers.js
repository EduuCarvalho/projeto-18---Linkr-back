import { deleteFollowing, insertFollowing } from "../repositories/followingRepository.js";
import { selectUser } from "../repositories/usersRepository.js";

export async function postFollow(req, res) {
    const userId = req.user;
    const { id } = req.params;
  
    try {
      const { rows } = await selectUser(id);
      const [user] = rows;
      if (!user) {
        res.status(404).send({ message: "The user doesn't exist!" });
        return;
      }

      if (userId === user.id) {
        res.status(409).send({ message: "You can't follow yourself!" });
        return;
      }
  
      await insertFollowing(userId, user.id);
  
      res.status(200).send({ message: "The user has been followed!" });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  
  export async function removeFollow(req, res) {
    const userId = req.user;
    const { id } = req.params;
  
    try {
      const { rows } = await selectUser(id);
      const [user] = rows;
      if (!user) {
        res.status(404).send({ message: "The user doesn't exist!" });
        return;
      }

      if (userId === user.id) {
        res.status(409).send({ message: "You can't unfollow yourself!" });
        return;
      }
  
      await deleteFollowing(userId, user.id);
  
      res.status(200).send({ message: "The user has been unfollowed!" });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }