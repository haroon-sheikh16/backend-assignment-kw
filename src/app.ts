import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes";
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use("/", routes);

app.listen(port, () => console.log(`Server is running on ${port}`));
