import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  //----JSON WEB TOKEN WORK

  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "Access denied.No token provided.",
    });
  }
  let token = req.headers.authorization.split(" ")[1];
  //let secret = process.env.SECRET_KEY;

  try {
    let payload = jwt.verify(token, "shhh...");
    req.body.payload = payload;
    next();
  } catch (ex) {
    return res.status(400).send({
      message: "Invalid token",
    });
  }

  //next();
};
