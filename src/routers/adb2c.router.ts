import express from "express";
import { Adb2cService } from "../services/adb2c/adb2c.service.js";

export const router = express.Router();

const adb2cService = new Adb2cService();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// define the home page route
router.get("/", (req, res) => {
  res.status(200).contentType("text/html").send("<h1>ADB2C Service</h1>");
});

// define the about route
router.get("/reset_emailtemplate.html", (req, res) => {
  const username = String(req.query["username"]);
  console.log("get reset email template of ", { username });

  res.contentType("text/html");
  res.charset = "utf-8";
  res.status(200);
  res.send(adb2cService.getResetEmailTemplate(username));
});
