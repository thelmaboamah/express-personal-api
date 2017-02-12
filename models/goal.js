var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var GoalSchema = new Schema({
	goal: String,
	whyImportant: String,
	completeByDate: String,
	completed: {type: Boolean, default: false},
	reward: String
})

var Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;