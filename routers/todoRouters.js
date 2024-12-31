import express from "express";
import {
  getAllTodo,
  getById,
  createTodo,
  updateById,
  deleteById,
} from "../controllers/todoControllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").get( isAuthenticated,getAllTodo).post(isAuthenticated,createTodo);
router.route("/:id").get(isAuthenticated,getById).put(isAuthenticated,updateById).delete(isAuthenticated,deleteById);

export default router;
