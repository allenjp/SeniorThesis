// TODO: Salt the votingUser in the VoteSchema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* USER SCHEMA
*
* This schema holds all of the users

* Each document holds:
*
* first name (string)
* last name (string)
* department (string)
*/
var UserSchema = new Schema({
    "fname": String,
    "lname": String,
    "dept": String
});

/*
* ELECTION SCHEMA
*
* This schema holds all of the elections
*
*
* Each document holds:
*
* name of the election (string)
* department (string)
* position to be voted on (string)
* list of users able to vote in this election (user ID's)
*/
var ElectionSchema = new Schema({
    "name": String,
    "dept": String,
    "position": String,
    "ableToVoteIn": [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

/*
* VOTE SCHEMA
*
* This schema holds each individual vote
* 
* Each document holds:
*
* The electionID the vote applies to (election ID)
* The ID of the user who cast the vote (User ID)
* The ID of the user the vote is cast for (User ID)
*/
var VoteSchema = new Schema({
    "election": [{ type: Schema.Types.ObjectId, ref: 'Election' }],
    "votingUser": [{ type: Schema.Types.ObjectId, ref: 'User' }],
    "votedFor": [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

/*
* CODE SCHEMA
*
* This schema holds the temporary codes which allow the user to vote
* 2-step verification
* 
* Each document holds:
*
* The user ID the code is designated for (user ID)
* The code itself (string)
* When the code expires (Date)
*/

var CodeSchema = new Schema({
    "user": [{ type: Schema.Types.ObjectId, ref: 'User' }],
    "code": String,
    "expires": Date
});

var User = mongoose.model('User', UserSchema);
var Election = mongoose.model('Election', ElectionSchema);
var Vote = mongoose.model('Vote', VoteSchema);

module.exports = mongoose.model('User', UserSchema);