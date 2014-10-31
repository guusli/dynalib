'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Get list of users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, users);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id)
  .populate('loans')
  .exec(function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return res.json(user);
  });
};

exports.me = function(req, res) {
  User.findById(req.session.user._id)
  .populate('loans')
  .exec(function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return res.json(user);
  });
};


// Creates a new user in the DB.
exports.create = function(req, res) {
  User.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.json(201, user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.addLoan = function(req, res) {
  User.findByIdAndUpdate(req.session.user._id,
    {$addToSet: {loans: req.params.bookId}},
    {}, 
    function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return res.json(200, user);
  });
}

// Deletes a loan from the DB.
exports.removeLoan = function(req, res) {
  User.findByIdAndUpdate(req.session.user._id,
    {$pull: {loans: req.params.bookId}},
    {}, 
    function (err, user) {
    if(err) { return handleError(res, err); }
    return res.send(200, user);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}