const express = require('express');
const router = express.Router();
const passport = require('passport')

const reportsController = require('../controllers/reports_controller');

router.get('/:status', passport.authenticate('jwt', {session: false}), reportsController.status);


module.exports = router;