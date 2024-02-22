import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import signupRouter from "./routes/signup.route.js";
import signinRouter from "./routes/signin.route.js";
import googleRouter from "./routes/google.route.js";
dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("Server started in port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/server/user", userRouter);
app.use("/server", signupRouter);
app.use("/server", signinRouter);
app.use("/server", googleRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
