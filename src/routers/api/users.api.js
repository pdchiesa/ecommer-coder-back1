import { Router } from "express";

import {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  destroyUser,
} from "../../controllers/users.controller.js";

import isValidUser from "../../middlewares/isValidUser.mid.js";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.get("/:uid", getUser);
userRouter.post("/", isValidUser, createUser);
userRouter.put("/:uid", updateUser);
userRouter.delete("/:uid", destroyUser);

export default userRouter;
