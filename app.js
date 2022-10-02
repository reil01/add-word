require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//imports router
const wordRoute = require("./routes/word.route");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Conneted on Mongoose!"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//allow acces to fetch on html javascript
// app.use((req, res, next) => {
//   res.setHeader(("Access-Control-Allow-Origin", "*"));
//   res.setHeader(("Access-Control-Allow-Methods", "GET, POST, DELETE")); // PATCH, PUT for update
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//welcome route default
app.get("/", (req, res) => {
  res.send("Welcome to custom Addwords");
});

//initialize route
app.use("/word", wordRoute);

//404 page not found
app.use("/", (req, res, next) => {
  res.send("(404) Page Not Found");
});

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
