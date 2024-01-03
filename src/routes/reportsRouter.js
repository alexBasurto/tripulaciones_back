import { Router } from "express";

import reportsController from "../controllers/reportsController.js";

const reportsRouter = Router();

reportsRouter.get("/employees", (req, res) => {
  reportsController.getEmployees(req, res);
}
);

reportsRouter.get("/departments", (req, res) => {
  reportsController.getDepartments(req, res);
}
);

reportsRouter.get("/employees/:id", (req, res) => {
  reportsController.getEmployeeById(req, res);
}
);

reportsRouter.get("/departments/:id", (req, res) => {
  reportsController.getDepartmentById(req, res);
}
);

export default reportsRouter;