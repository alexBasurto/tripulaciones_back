import { Router } from "express";

import commentsController from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.get("/", (req, res) => {
  commentsController.getAll(req, res)
});

commentsRouter.get("/:id", (req, res) => {
  commentsController.getById(req, res)
});

commentsRouter.post("/new", (req, res) => {
  commentsController.create(req, res)
});


export default commentsRouter;