
'use strict';

var express = require('express');
var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  '953613843147-gm9doglvnvpdlok393d7ltbqs5d3t784.apps.googleusercontent.com',
  'GihcQIApjy0mxYPzGcZ-lfsl',
  'http://localhost:9000/auth/callback');
var User = require('../api/user/user.model');

var router = express.Router();

router
  .get('/', function(req, res) {

  var url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
      scope: 'https://www.googleapis.com/auth/plus.me' // If you only need one scope you can pass it as string
    });

  res.redirect(url);

});

router.get('/loggedIn', function(req, res) {
  if(req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({});
  }
});

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});

router.get('/callback', function(req, res) {

  oauth2Client.getToken(req.query.code, function(err, tokens) {

    if (!err) {
      oauth2Client.setCredentials(tokens);

      req.session.access_token = tokens.access_token;
      req.session.refresh_token = tokens.refresh_token;

      plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {

        User.findOneAndUpdate({googleId: response.id}, 
          { googleId: response.id, name: response.displayName },
          {upsert: true},
          function(err, user) {
            req.session.user = user;
            return res.redirect('/');
          }
          );
      });
    } else {
      return res.redirect('/');
    }

  });
});

module.exports = router;
