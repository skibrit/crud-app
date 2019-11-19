const express = require("express");
const app = express();
const dbConnecter = require("../config/dbConnecter");
const routeList = require("./routeList");
const PORT = process.env.PORT || 6000;

//create a connection to database
dbConnecter();

// attach routes
app.use("/api/user", routeList.User);

//add middleware parse
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
