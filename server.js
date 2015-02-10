// BASE SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// mongoose setup & database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:Woky669.@ds053668.mongolab.com:53668/main');

var User = require('./app/models/models');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Routes for API
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api' });
});

router.route('/users')

    // create a user
    .post(function (req, res) {
        var user = new User(); // creates a new instance of the User model
        user.fname = req.body.fname;
    
        // save the user and check for errors
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User created' });
        });
    })

    .get(function (req, res) {
        res.json({ message: 'getting bear page' });
    });

// Register the routes
// all routes will be prefixed with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Operating on port ' + port);