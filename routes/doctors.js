const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctor_controller');


router.post('/register', doctorController.register);

router.get('/login', doctorController.login);

module.exports = router;