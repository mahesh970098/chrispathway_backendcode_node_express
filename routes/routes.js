const express = require('express');
router = express.Router();

const adminRoutes = require('../controllers/adminCtrl');
// const adminRoutes = require('../controllers/adminCtrl')

// #########################---ADMIN---########################
router.post('/login', adminRoutes.login)
router.post('/admincreateUser', upload.fields(
    [
        { name: 'offer_letter', maxCount: 1 }
    ]
), adminRoutes.admincreateUser)
router.get('/roles', adminRoutes.roles)
router.post('/creating_task', adminRoutes.creating_task)
router.post('/view_task', adminRoutes.view_task)
router.post('/view_task_status_update', adminRoutes.view_task_status_update)
router.post('/names_basedon_role', adminRoutes.names_basedon_role)
router.post('/send_message', adminRoutes.send_message)
router.post('/notification_display', adminRoutes.notification_display)

router.post('/admin_csv_upload', upload.fields([{
    name: 'file_upload', maxCount: 1
}]),adminRoutes.admin_csv_upload)

router.post('/assigned_stud_list_csv', adminRoutes.reverted_stud_list_csv)
router.post('/assigned_stud_save_button', adminRoutes.reverted_stud_save_button)


//manage roles get api
router.get('/manage_roles_get', adminRoutes.manage_roles_get)
router.post('/manage_roles_delete', adminRoutes.manage_roles_delete)

// advisor
router.post('/advisor_todo_row_save', adminRoutes.advisor_todo_row_save)
router.post('/advisor_create_student', adminRoutes.advisor_create_student)

router.get('/advisor_assign_stud_dropdown', adminRoutes.advisor_assign_stud_dropdown)
router.post('/advisor_assign_advisorname_dropdown', adminRoutes.advisor_assign_advisorname_dropdown)
router.post('/advisor_assign_form_submit', adminRoutes.advisor_assign_form_submit)
module.exports = router;