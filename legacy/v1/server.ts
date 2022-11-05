import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/users";
import { countryRouter } from "./routes/countries";
import { statsRouter } from "./routes/stats";
import { searchRouter } from "./routes/search";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

mongoose.connect(process.env.ATLAS??"", {});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Data parsing
app.use(require('prerender-node').set("prerenderToken", process.env.PRERENDER??""));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api/users", userRouter);
app.use("/api/countries", countryRouter);
app.use("/api/stats", statsRouter);
app.use("/api/search", searchRouter);

app.get("/sitemap.xml", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/sitemap.xml"));
});

app.get("/favicon.ico", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/favicon.ico"));
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => console.log(`Server is starting at ${PORT}`));
