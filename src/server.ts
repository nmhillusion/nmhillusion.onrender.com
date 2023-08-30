import express from "express";
import { router as duolingoRouter } from "./controllers/duolingo.router.js";

// set up express web server
const app = express();

// Start web server on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// Main page
app.get("/", async (_request, response) => {
  response.json({
    data: "hello world, now: " + new Date().toISOString(),
  });
});

app.use("/duolingo", duolingoRouter);
