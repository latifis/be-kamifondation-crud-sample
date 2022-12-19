const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// env
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const db = require("./app/models");

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
// });

//for production
// db.sequelize.sync();
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));
// app.use();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
require('./app/routes/voucher.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});