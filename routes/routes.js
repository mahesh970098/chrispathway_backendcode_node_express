const express = require('express');
router = express.Router();

const adminRoutes = require('../controllers/adminCtrl');
// const adminRoutes = require('../controllers/adminCtrl')

// #########################---ADMIN---########################
router.post('/login',adminRoutes.login)
router.post('/admincreateUser', upload.fields(
    [
        { name: 'offer_letter', maxCount: 1 }
    ]
) ,adminRoutes.admincreateUser)
router.get('/roles', adminRoutes.roles)
router.post('/creating_task', adminRoutes.creating_task)
router.post('/view_task', adminRoutes.view_task)
router.post('/view_task_status_update', adminRoutes.view_task_status_update)
router.post('/names_basedon_role', adminRoutes.names_basedon_role)
router.post('/send_message', adminRoutes.send_message)

//manage roles get api
router.get('/manage_roles_get', adminRoutes.manage_roles_get)
router.post('/manage_roles_delete', adminRoutes.manage_roles_delete)
module.exports = router;