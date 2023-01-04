import { Router } from "express";
import { getUsersBySearch } from "../controllers/usersController.js";

const users = Router();

users.get('/users', getUsersBySearch);

export default users;