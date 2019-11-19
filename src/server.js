const express = require("express");
const app = express();
const PORT = process.env.PORT || 6000;

//add middleware parse
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
