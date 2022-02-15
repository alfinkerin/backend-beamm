const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//load env vars
dotenv.config({ path: "./config/config.env" });

//load models

const User = require("./models/User");

//Connect to db
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/digo", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JSON files

const user = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/_dataUser.json`, "utf-8")
);

//import into database
const importData = async () => {
  try {
    await User.create(user);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete data
const deleteData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
