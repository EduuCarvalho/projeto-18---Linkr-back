import { Router } from "express";
import { getUserPosts, getUsersBySearch } from "../controllers/usersController.js";
import authValidation from "../middlewares/authValidation.js";

const users = Router();

users.get('/users', authValidation, getUsersBySearch);
users.get('/users/:id', authValidation, getUserPosts);

export default users;