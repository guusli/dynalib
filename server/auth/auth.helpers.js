function requiredAuthentication(req, res, next) {
  console.log(req.session);
  if (req.session.user) {
  	console.log(req);
    next();
  } else {
    console.log("Not logged in!");
    req.session.error = 'Access denied!';
    res.redirect('/');
  }
}

exports.requiredAuthentication = requiredAuthentication;