import express, { Request, Response } from "express";
import cors from "cors";
import { routes } from "./app/routes";
import globalErrorhandler from "./app/middlewares/globalErrorhandler";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to portfolio server");
});

app.get("/api", (req, res) => {
  res.send("Welcome to portfolio server");
});

// Application routes
app.use("/api", routes);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Api not found!",
  });
});

app.use(globalErrorhandler);

export default app;
