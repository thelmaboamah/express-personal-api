var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://heroku_vjg09pbs:4rtk2e90pb7gp3iopthti0k7lb@ds147789.mlab.com:47789/heroku_vjg09pbs");

module.exports.Goal = require("./goal.js");
