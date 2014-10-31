'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.helpers');

var router = express.Router();

router.get('/', controller.index);
router.get('/me', auth.requiredAuthentication, controller.me);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/loans/:bookId', controller.addLoan);
router.delete('/loans/:bookId', controller.removeLoan);

module.exports = router;