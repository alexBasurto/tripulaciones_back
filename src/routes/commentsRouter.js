import { Router } from "express";

import { isAuthenticated } from "../middlewares/authMiddleware.js";
import commentsController from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.get("/", isAuthenticated, (req, res) => {
  commentsController.getAll(req, res)
});

commentsRouter.get("/:id", isAuthenticated, (req, res) => {
  commentsController.getById(req, res)
});

commentsRouter.post("/new", isAuthenticated, (req, res) => {
  commentsController.create(req, res)
});


export default commentsRouter;