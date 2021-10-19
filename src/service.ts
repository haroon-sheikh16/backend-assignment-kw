import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { credentials, task, payload } from "./interface";

let userData: { email: String; password: String; id: Number }[] = [];
let tasks: { name: String; id: Number }[] = [];

class Service {
  constructor() {}
  register = (data: credentials, res: Response) => {
    if (data.email && data.password) {
      let email: String = data.email;
      let password: String = data.password;
      let alreadyExist = false;

      if (userData.length > 0) {
        userData.forEach((user) => {
          if (user.email === email) {
            alreadyExist = true;
          }
        });
      }

      if (alreadyExist) {
        res.status(400).send({
          message: "user already exist with this email.",
        });
      } else {
        let user = { email, password, id: userData.length + 1 };
        userData.push(user);
        return res.send({
          user: { id: user.id, email: user.email },
        });
      }
    } else {
      return res.status(400).send({
        message: "email or password not provided",
      });
    }
  };

  login = (data: credentials, res: Response) => {
    if (data.email && data.password) {
      let email: String = data.email;
      let password: String = data.password;
      let login = false;
      let userId: Number = 0;
      if (userData.length > 0) {
        userData.forEach((user) => {
          if (user.email === email && user.password === password) {
            login = true;
            userId = user.id;
          }
        });
      }
      if (!login) {
        res.status(400).send({
          message: "email or password invalid.",
        });
      } else {
        let payload = {
          id: userId,
          email: email,
        };
        let token = jwt.sign(payload, "shhh...");

        return res.send({
          message: "user login successfully",
          jwt: token,
        });
      }
    } else {
      return res.status(400).send({
        message: "email or password not provided",
      });
    }
  };

  user = (data: payload, res: Response) => {
    let userExist = false;

    if (userData.length > 0) {
      userData.forEach((user) => {
        if (user.email === data.payload.email && user.id === data.payload.id) {
          userExist = true;
        }
      });
    }

    if (!userExist) {
      res.status(400).send({
        message: "user does not exist.",
      });
    } else {
      return res.send({
        user: { id: data.payload.id, email: data.payload.email },
      });
    }
  };

  createTask = (data: task, res: Response) => {
    if (data.name) {
      let name: String = data.name;

      let taskdata = { name, id: tasks.length + 1 };
      tasks.push(taskdata);
      return res.send({
        task: { id: taskdata.id, name: taskdata.name },
      });
    } else {
      return res.status(400).send({
        message: "task name not provided",
      });
    }
  };

  listTasks = (res: Response) => {
    return res.send({
      tasks: tasks,
    });
  };
}

export const service = new Service();
