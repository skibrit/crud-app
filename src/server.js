const express = require("express");
const app = express();
const dbConnecter = require("../config/dbConnecter");
const routeList = require("./routeList");
const PORT = process.env.PORT || 6000;

//create a connection to database
dbConnecter();

//add middleware parse
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// attach routes
app.use("/api/user", routeList.User);
app.use("/api/post", routeList.Post);

app.get("/", function(req, res) {
  res.send("Welcome to Test App");
});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
