// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require('dotenv').config()

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
app.use(cors());

// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const playersRouter = require("./routes/players");
const playRouter = require("./routes/plays");
const statRouter = require("./routes/stats");
const userRouter = require("./routes/user");
const newPlayerRouter = require("./routes/newplayer");
app.use("/players", playersRouter);
app.use("/plays", playRouter);
app.use("/stats", statRouter);
app.use("/login", userRouter);
app.use("/newplayer", newPlayerRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
