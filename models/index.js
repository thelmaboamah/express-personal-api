var mongoose = require("mongoose");
//mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");
mongoose.connect("mongodb://heroku_vjg09pbs:4rtk2e90pb7gp3iopthti0k7lb@ds147789.mlab.com:47789/heroku_vjg09pbs" || "mongodb://localhost/personal-api")
module.exports.Goal = require("./goal.js");
