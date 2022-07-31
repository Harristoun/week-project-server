const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//........................
const mail = require("./mail.js");
//........................

const app = express();
require("dotenv").config();

const path = require("path");

app.use(express.json());
app.use(cors());

//--------------------------

app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.send(`Requested from ${req.hostname} : <h1>Hello World</h1>`)
);
app.post("/mail", async (req, res) => {
  const { email, message } = req.body;

  mail("root@localhost.ru", email, "subj", message);

  return res.json("отправлено");
});
//--------------------------

app.use(require("./routes/User.route"));
app.use(require("./routes/Genre.route"));
app.use(require("./routes/Hall.route"));
app.use(require("./routes/Movie.route"));
app.use(require("./routes/Rating.route"));

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
