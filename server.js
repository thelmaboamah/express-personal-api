// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  //API description, important links, and endpoints
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/thelmaboamah/express-personal-api/blob/master/README.md",
    baseUrl: "https://polar-garden-26220.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "api/goals", description: "See all my goals." },
      {method: "GET", path: "api/goals/:goal_id", description: "Get a specific goal by id."},
      {method: "POST", path: "/api/goals", description: "Create a new goals"},
      {method: "PUT", path: "/api/goals/:goal_id", description: "Update a goal."},
      {method: "DELETE", path: "/api/goals/:goal_id", description: "Delete a goal."}
    ]
  })
});

app.get('/api/profile', function profile(req, res) {
  res.json({
    name: "Thelma Boamah",
    githubProfile: "https://github.com/thelmaboamah",
    githubImg: "https://avatars1.githubusercontent.com/u/17172664?v=3&s=460",
    portfolioSite: "http://thelma.codes/",
    currentCity: "Oakland, CA",
    pets: false,
    favoriteThings: ["singing", "musical theater", "live music", "roller coasters", "good food", "earrings", "lipstick"]
  })
});

/**********
 * SERVER *
 **********/

app.get('/api/goals', function apiIndex(req, res) {
  //See all my goals
  db.Goal.find({}, function(err, allGoals){
    if (err) {console.log("Error: ", err);}
    res.json(allGoals);
  });
});

app.get('/api/goals/:goal_id', function showGoal(req, res) {
  //Get one goal by id
  var goalId = req.params.goal_id;
  db.Goal.find({_id: goalId}, function(err, foundGoal) {
    if (err) {console.log("Error: ", err);}
    res.json(foundGoal);
  });
});

app.post('/api/goals', function createGoal(req, res) {
  //Create a new goal
  var newGoal = new db.Goal({
    goal: req.body.goal,
    whyImportant: req.body.whyImportant,
    completeByDate: req.body.completeByDate,
    reward: req.body.reward
  })

  newGoal.save(function(err, savedGoal) {
    if (err) {console.log("Error: ", err)};
    console.log("Created new goal:" , savedGoal.goal);
    res.json(savedGoal);
  })
});

app.delete('/api/goals/:goal_id', function deleteGoal(req, res) {
  //Delete a goal
  var goalId = req.params.goal_id;
  db.Goal.findOneAndRemove({_id: goalId}, function(err, foundGoal) {
    if (err) {console.log("Error: ", err);}
    res.sendStatus(204);
  });
});

app.put('/api/goals/:goal_id', function updateGoal(req, res) {
  //Update a goal
  var goalId = req.params.goal_id;
  
  db.Goal.findOne({_id: goalId}, function(err, goal){
    var body = req.body;
    console.log(body);
    for(key in body){
      if(body[key]){
        goal[key] = body[key];
      }
    }
    goal.save(function(err, updatedGoal){
      res.json(updatedGoal);
    })
  })
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
