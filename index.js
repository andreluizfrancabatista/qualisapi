// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
let dbURI = 'mongodb+srv://andrebatista:iAcQdxZ3eJjWt6HU@cluster0.81pdb.gcp.mongodb.net/qualisdb?retryWrites=true&w=majority';
try {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  var db = mongoose.connection;
  if (!db)
    console.log("Error connecting DB");
  else
    console.log("DB connected successfully");
} catch (err) {
  console.log(err);
}

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open successfully');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});


// Added check for DB connection
/*var db = mongoose.connection;
if (!db)
  console.log("Error connecting DB");
else
  console.log("DB connected successfully");*/


// Setup server port
var port = process.env.PORT || 8080;

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Send message for default URL
//app.get('/', (req, res) => res.send('Hello World with Express'));
app.get('/', function(req, res){
  res.sendFile('index.html');
});

// Use Api routes in the App
app.use('/api', apiRoutes);


// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});