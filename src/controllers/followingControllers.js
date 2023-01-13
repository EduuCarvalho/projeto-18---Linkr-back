import { insertFollowing } from "../repositories/followingRepository.js";
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
  
      await insertFollowing(userId, user.id);
  
      res.status(200).send({ message: "The user has been followed!" });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  