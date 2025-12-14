import express from "express";
import * as fs from "fs";
import * as path from "path";

export const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// define the home page route
router.get("/", (req, res) => {
  res.render("editico/index", {
    title: "Editico Editor",
    message: "Instant copy / paste your content",
  });
});

router.get("/view/:contentId", (req, res) => {
  const contentId = req.params.contentId;

  const filePath = path.join(process.cwd(), `/temp/${contentId}.txt`);

  if (!fs.existsSync(filePath)) {
    res.status(404).send("File not found");
    return;
  }

  res.render("editico/view", {
    title: "Editico Viewer",
    contentId,
    content: fs.readFileSync(filePath, {
      encoding: "utf8",
    }),
  });
});

router.post("/save", (req, res) => {
  const content = req.body.content;
  console.log("Received content to save:", content);
  const contentId = `tmp_${Date.now()}`;
  const savePath = path.join(process.cwd(), `/temp/${contentId}.txt`);

  if (!fs.existsSync(path.dirname(savePath))) {
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
  }

  console.log("Saving content to file path:", savePath);

  fs.writeFileSync(savePath, content);

  res.json({
    status: "success",
    message: "Content saved successfully to Content ID (save it for reload later): " + contentId,
  });
});
