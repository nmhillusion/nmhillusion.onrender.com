import express from "express";

// set up express web server
const app = express();

// Main page
app.get("/", async (_request, response) => {
  response.json({
    data: "hello world, now: " + new Date().toISOString(),
  });
});

// Start web server on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
