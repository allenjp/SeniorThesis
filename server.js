/*
* TODOS:
* mockups of pages (balsamiq)
* visual data models
* task schedule
* sequence diagram (https://www.websequencediagrams.com/#)
*/

// BASE SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// mongoose setup & database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:Woky669.@ds053668.mongolab.com:53668/main');

var Ballot = require('./app/models/models');
var Election = require('./app/models/models');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(express.static(__dirname + '/public/'));

// set the view engine to ejs
app.set('view engine', 'ejs');

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

router.route('/index')
    // load the index page
    .get(function (req, res) {
        res.render('pages/index');
    });

router.route('/create')
    // load the create page
    .get(function (req, res) {
        res.render('pages/create');
    })

    .post(function (req, res) {
        Election.create({
            title : req.body.title,
            school : req.body.school,
            faculty : req.body.faculty,
            ballots : req.body.ballots        
        }, function (err, elections) {  
            if (err) {
                res.send(err);
            }
            
            res.json(elections);
        });
    });

router.route('/register')
    // load the first vote page
    .get(function (req, res) {
        res.render('pages/register');
    });

router.route('/submit')
    // load the second vote page
    .get(function (req, res) {
        res.render('pages/submit');
    });
        
// Register the routes
// all routes will be prefixed with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Operating on port ' + port);