'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('./user.model');
//var mongoose = require('mongoose');
describe("User routes: ", function() {
  
  beforeEach(function(done) {
    User.find({}).remove().exec()
    .then(function() {
      User.create({
        name: 'Test User',
        googleId: '1',
        loans: []
      });
      done();
    });
  });

describe('GET /api/users', function() {

  it('should respond with JSON array', function(done) {

    request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/users/:id', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/users')
      .query({id: '111111111111111111111111'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should return correct user', function(done) {
    var searchId = '111111111111111111111111'
    request(app)
      .get('/api/users')
      .query({id: searchId})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var foundId = res.body[0]._id;
        foundId.should.be.searchId;
        done();
      });
  });
});

});