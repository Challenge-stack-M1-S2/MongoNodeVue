const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model")(mongoose);
db.role = require("./role.model")(mongoose);
db.appointment = require("./appointment.model")(mongoose);
db.review = require("./review.model")(mongoose);
db.session = require("./session.model")(mongoose);
db.style = require("./style.model")(mongoose);
db.tattoo = require("./tattoo.model")(mongoose);

db.ROLES = ["user", "artist"];

module.exports = db;
