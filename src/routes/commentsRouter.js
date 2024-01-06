import { Router } from "express";

import commentsController from "../controllers/commentsController.js";

const reportsRouter = Router();

reportsRouter.get("/employees", (req, res) => {
  commentsController.getEmployees(req, res);
}
);

reportsRouter.get("/departments", (req, res) => {
  commentsController.getDepartments(req, res);
}
);

reportsRouter.get("/employees/:id", (req, res) => {
  commentsController.getEmployeeById(req, res);
}
);

reportsRouter.get("/departments/:id", (req, res) => {
  commentsController.getDepartmentById(req, res);
}
);

export default commentsRouter;