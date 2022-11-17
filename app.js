const express = require("express");
const mongoose = require("mongoose");
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");
const connect = require("./connection/connect");
let port=3000
const app = express();


app.use("/api/v1", loginRoutes);
app.use("/api/v1/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(port, () => console.log("server is running"));