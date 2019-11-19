const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  return new Promise(async resolve => {
    try {
      let mongoURI = config.get("mongoURI");
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });
      console.log("Connected to database");
      resolve(true);
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  });
};

module.exports = connectDB;
