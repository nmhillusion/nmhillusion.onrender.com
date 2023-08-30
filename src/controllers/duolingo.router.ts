import express from "express";
import { DuolingoService } from "../services/duolingo.service.js";

export const router = express.Router();

const duolingoService = new DuolingoService();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// define the home page route
router.get("/", (req, res) => {
  res.send("Birds Duolingo home page");
});

// define the about route
router.get("/about", (req, res) => {
  res.contentType("application/json");
  res.send({
    file: duolingoService.getFile("app.js"),
  });
});
