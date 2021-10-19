import { Request, Response, NextFunction } from "express";
import * as EmailValidator from "email-validator";

export const emailValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (EmailValidator.validate(req.body.email)) {
    next();
  } else {
    return res.status(400).send({
      message: "Invalid email",
    });
  }
};
