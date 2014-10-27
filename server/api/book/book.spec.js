'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Book = require('./book.model');
//var mongoose = require('mongoose');
describe("Book routes: ", function() {
  
  beforeEach(function(done) {
    Book.find({}).remove().exec()
    .then(function() {
      Book.create({
        name: 'Test Book',
        ISBN: '1'
      });
      done();
    });
  });

describe('GET /api/books', function() {

  it('should respond with JSON array', function(done) {

    request(app)
      .get('/api/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/books/:id', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/books')
      .query({id: '111111111111111111111111'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should return correct book', function(done) {
    var searchId = '111111111111111111111111'
    request(app)
      .get('/api/books')
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