const express = require('express');
router = express.Router();

const adminRoutes = require('../controllers/adminCtrl');
// const adminRoutes = require('../controllers/adminCtrl')

// #########################---ADMIN---########################
router.post('/login', adminRoutes.login)
router.post('/admincreateUser', adminRoutes.admincreateUser)
router.get('/roles', adminRoutes.roles)

module.exports = router;