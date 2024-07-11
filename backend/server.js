const express = require("express");
const cors = require("cors");
const { DbConnect } = require("./app/config/db.config");
const myEnv = require("./app/config/conf");

const app = express();
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Tattoo = db.tattoo;
const Session = db.session;
const Appointment = db.appointment;
const Review = db.review;
const Style = db.style;

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

DbConnect()
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

require("./app/routes/tattoo.routes")(app);
require("./app/routes/session.routes")(app);
require("./app/routes/appointment.routes")(app);
require("./app/routes/style.routes")(app); 


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
