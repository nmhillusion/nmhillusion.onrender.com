import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Unsplash Service welcome GET");
});

router.post("/update", upload.single("upload_file"), (req, res) => {
  console.log("headers = ", req.headers);

  let checkAuthorization = false;
  if (req.header("client-id") === "raccoon-scheduler-image") {
    if (
      req.header("client-secret") ===
      "raccoon-scheduler#~Y9X(l&=>,;WC--.:m]#VvqCommon775"
    ) {
      checkAuthorization = true;
    }
  }

  if (!checkAuthorization) {
    res.status(401);
    res.send("Request is Unauthorized");
    return;
  } else {
    console.log(
      "request is authorized with client-id: ",
      req.header("client-id")
    );
  }

  console.log("params: ", req.params);
  console.log("query: ", req.query);

  console.log("body: ", req.body);
  console.log("uploaded file: ", req.file);

  const desDirPath = path.resolve(process.cwd(), "static", "unsplash");
  console.log({ desDirPath });

  if (!fs.existsSync(desDirPath)) {
    fs.mkdirSync(desDirPath, {
      recursive: true,
    });
  }

  if (req.body["file_info"]) {
    fs.writeFileSync(
      path.join(desDirPath, "image_info.json"),
      req.body["file_info"]
    );
  }

  if (req.file) {
    let savedPath = "";

    savedPath = path.join(desDirPath, "wallpaper.png");
    fs.writeFileSync(savedPath, req.file.buffer, {
      flush: true,
    });

    console.log("Saved wallpaper to path: ", savedPath);

    res.status(201);
    res.send("Unsplash Service:: Received wallpaper file.");
  } else {
    res.status(400);
    res.send("Cannot determine upload file");
  }
});
