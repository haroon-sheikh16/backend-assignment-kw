import { Request, Response, NextFunction } from "express";
import { service } from "./service";

class Controller {
  register = (req: Request, res: Response, next: NextFunction) => {
    return service.register(req.body, res);
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    return service.login(req.body, res);
  };

  user = (req: Request, res: Response, next: NextFunction) => {
    return service.user(req.body, res);
  };

  createTask = (req: Request, res: Response, next: NextFunction) => {
    return service.createTask(req.body, res);
  };

  listTasks = (req: Request, res: Response, next: NextFunction) => {
    return service.listTasks(res);
  };
}

export const controller = new Controller();
