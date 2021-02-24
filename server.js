import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'
import countryRouter from './routes/countries.js'
dotenv.config()

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

app.use("/api/users", usersRouter)
app.use("/api/countries", countryRouter)

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
