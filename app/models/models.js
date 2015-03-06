/* TODO: Salt the votingUser in the VoteSchema
* Make ballot schema.  These are the pieces that make up the election
*/

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
    "school": String,
    "emp-status": String
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
* position to be voted on (string)
* list of elegible schools (strings),
* list of eligble statuses (strings)
*/
var ElectionSchema = new Schema({
    "title": String,
    "school": String,
    "faculty": String,
    "ballots": [{
        "desc": String,
        "position": String,
        "votes": [{type: Schema.Types.ObjectId, ref: 'Vote'}]
    }]
});

/*
* BALLOT SCHEMA
*
* This schema holds all of the ballots
* These are the pieces of the elections
*
*
* Each document holds:
*
* The electionID the ballot applies to
* The votes that correspond to this ballot
*/

//var BallotSchema = new Schema({
//    "desc": String,
//    "position": String,
//    "election": {type: Schema.Types.ObjectId, ref: 'Election' },
//    "votes": [{type: Schema.Types.ObjectId, ref: 'Vote'}]
//});

/*
* VOTE SCHEMA
*
* This schema holds each individual vote
* 
* Each document holds:
*
* The ballotID the vote applies to (ballot ID)
* The ID of the user who cast the vote (User ID)
* The ID of the user the vote is cast for (User ID)
*/
var VoteSchema = new Schema({
    "ballot": { type: Schema.Types.ObjectId, ref: 'Ballot' },
    "votingUser": { type: Schema.Types.ObjectId, ref: 'User' },
    "votedForUser": [{ type: Schema.Types.ObjectId, ref: 'User' }],
    "votedForYesNo": Boolean
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
var Code = mongoose.model('Code', CodeSchema);

module.exports = mongoose.model('User', UserSchema);