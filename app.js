const express = require("express");
const mongoose = require("mongoose");
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");
const connect = require("./connection/connect");
var jwt = require("jsonwebtoken");
const secret = "RESTAPI";
let port=3000
const app = express();

app.use("/api/v1/posts", (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    console.log("Verify token");
    if (token) {

      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return res.status(403).json({
            status: "failed",
            message: "Invalid token",
          });
        }
        req.user = decoded.data;
        next();
      });
    } else {
      return res.status(403).json({
        status: "failed",
        message: "Invalid token",
      });
    }
  } else {
    return res
      .status(403)
      .json({ status: "Failed", message: "Not authenticated user" });
  }
});

app.use("/api/v1", loginRoutes);
app.use("/api/v1/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(port, () => console.log("server is running"));
