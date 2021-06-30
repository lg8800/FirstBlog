const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, "images");
    }
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: storage, fileFilter: fileFilter }).any());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(require("./router/auth"));
app.use(require("./router/blog"));
app.use(require("./router/likes"));
app.use(require("./router/comments"));

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});