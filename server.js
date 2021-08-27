import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import countryRouter from "./routes/countries.js";
import statsRouter from "./routes/stats.js";
import searchRouter from "./routes/search.js";
import fs from "fs";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

// Step 2
mongoose.connect(process.env.ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors({ credentials: true, origin: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api/users", usersRouter);
app.use("/api/countries", countryRouter);
app.use("/api/stats", statsRouter);
app.use("/api/search", searchRouter);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/sitemap.xml", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/sitemap.xml"));
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
