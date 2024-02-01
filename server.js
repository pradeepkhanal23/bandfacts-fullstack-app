//importing core express
const express = require("express");

//importing dot env config to use our PORT env varaible
require("dotenv").config();

//import the connectDB function from the database
//remember its not gonna work if you check in config/db file because, the run script runs the server.js file and the fucntion has to be in this file in order to connect and make sure there is connection

const connectDB = require("./config/db");
connectDB();

//initializing the main app with expressz
const app = express();

//setting up port number to listen to
const port = process.env.PORT;

/*In Express.js, express.json() is a middleware function that parses incoming JSON requests. When you use express.json() in your application, it allows Express to automatically parse the request body if it is in JSON format. This middleware is part of the Express.js framework and is often used in conjunction with the app.use() function to apply it globally or to specific routes. Before we needed to import external package called Body Parse to parse the incoming JSON requests */

// Applying express.json() globally
app.use(express.json());

/*If we are dealing with form data instead of JSON, you can use express.urlencoded() middleware.This middleware is used to parse data sent as application/x-www-form-urlencoded. */
app.use(
  express.urlencoded({
    extended: false,
  })
);

//this is our entry route where user comes first, like a homepage
app.get("/", (req, res) => {
  res.send("Welcome to my band facts REST API Server");
});

//we are redirectin or combining the routes and its associated files via creating the route for associated user request

//In this case we are responding with facts route whenever the user hits https://localhost:8000/api/facts
const factsRouter = require("./routes/facts");

//we are using middleware here with that use() method which executes some other fucntion within our request and response cycle
app.use("/api/facts", factsRouter);

//envoking listen() method to listen on the given port number when the server is up and running
app.listen(port, () => {
  console.log(`The server is listening in port  ${port}`);
});

//add scripts like  following in the JSON package file to run the scripts
// "start": "node server.js",  (starts the server)
// "dev": "nodemon server.js", (monitors the node and apply the changes without restarting the server)
