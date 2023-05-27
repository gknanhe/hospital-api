const express = require('express');
const passport = require('passport');
const router = express.Router();

const patientController = require('../controllers/patients_controller');

router.post('/register', passport.authenticate('jwt', {session: false}), patientController.register);

router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), patientController.createReport);

router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}), patientController.reportsOfPatient);



module.exports = router;
