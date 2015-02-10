// TODO: Salt the user ID in the VoteSchema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "fname": String,
    "lname": String,
    "dept": String
});

var ElectionSchema = new Schema({
    "name": String,
    "dept": String,
    "position": String,
    "ableToVoteIn": [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var VoteSchema = new Schema({
    "election": [{ type: Schema.Types.ObjectId, ref: 'Election' }],
    "user": [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var CodeSchema = new Schema({
    "user": [{ type: Schema.Types.ObjectId, ref: 'User' }],
    "code": String,
    "expires": Date
});

var User = mongoose.model('User', UserSchema);
var Election = mongoose.model('Election', ElectionSchema);
var Vote = mongoose.model('Vote', VoteSchema);

module.exports = mongoose.model('User', UserSchema);