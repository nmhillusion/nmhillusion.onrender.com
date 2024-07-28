import express from "express";
import bodyParser from "body-parser";
import { router as duolingoRouter } from "./routers/duolingo.router.js";
import { router as unsplashRouter } from "./routers/unsplash.router.js";
import { router as adb2cRouter } from "./routers/adb2c.router.js";
import http from "http";
import path from "path";

// set up express web server
const app = express();
const server = http.createServer(app);
// parse various different types
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Main page
// app.get("/", async (_request, response) => {
//   response.json({
//     data: "hello world, now: " + new Date().toISOString(),
//   });
// });
app.get("/", (request, response) => {
  console.log("Env = ", process.env);
  response.send("server Ok");
});

app.use("/duolingo", duolingoRouter);

app.use("/unsplash", unsplashRouter);

app.use("/adb2c", adb2cRouter);

app.use("/static", express.static(path.join(process.cwd(), "static")));

// Start web server on port 3000
server.listen(3000, () => {
  console.log("Server is listening on port 3000, http://localhost:3000/");
});
