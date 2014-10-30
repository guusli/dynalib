/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var gbooks = require('google-books-search');
var _ = require('lodash');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/books', require('./api/book'));

  app.get('/googleLookup', function(req, res) {
    gbooks.search(req.query.isbn, {field: 'isbn'}, function(error, results) {
    if ( ! error ) {
        console.log(results);
        res.json({title: results[0].title, authors: results[0].authors, thumbnail: results[0].thumbnail});
    } else {
        res.send("Error");
    }

    
  });
  });

  app.use('/auth', require('./auth'));
  var auth = require('./auth/auth.helpers');

  app.get('/profile', auth.requiredAuthentication, function (req, res) {
    res.send('Profile page of '+ req.session.user.name +'<br>'+' click to <a href="/logout">logout</a>');
  });

  

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};