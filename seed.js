// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var goalsList = [
	{
		goal: "Attend a Women Who Code meetup",
		whyImportant: "Learn about how women in the industry are navigating their roles.",
		completeByDate: "2017-03-01",
		reward: "Get a manicure."
	},
	{
		goal: "Participate in Civic Hack Night in SF",
		whyImportant: "Meet civic-minded developers and contribute to a meaningful open source project.",
		completeByDate: "2017-03-08",
		reward: "Go on a hike."
	},
	{
		goal: "Conduct and informational interview",
		whyImportant: "Get insider knowledge about getting into and succeeding at a company I like.",
		completeByDate: "2017-03-15",
		reward: "Go out to dinner."
	},
	{
		goal: "Create and about page for my portfolio",
		whyImportant: "Provide more information about my background, interests, and goals.",
		completeByDate: "2017-04-01",
		reward: "Eat a cupcake."
	},
];


db.Goal.remove({}, function(err){
	if (err) {console.log("Error: ", err);}
	else {console.log("Emptied the database");}

	db.Goal.create(goalsList, function(err, goals) {
		if (err) {console.log("Error: ", err);}
		console.log("created", goals.length, "goals");
    process.exit();
	});
});