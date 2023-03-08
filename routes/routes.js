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
router.get('/admin_reverted_list_get', adminRoutes.admin_reverted_list_get)
router.post('/admin_reverted_list_delete', adminRoutes.admin_reverted_list_delete)
//manage roles get api
router.get('/manage_roles_get', adminRoutes.manage_roles_get)
router.post('/manage_roles_delete', adminRoutes.manage_roles_delete)

// advisor
router.post('/advisor_todo_row_save', adminRoutes.advisor_todo_row_save)
router.post('/advisor_create_student', adminRoutes.advisor_create_student)

router.get('/advisor_assign_stud_dropdown', adminRoutes.advisor_assign_stud_dropdown)
router.post('/advisor_assign_advisorname_dropdown', adminRoutes.advisor_assign_advisorname_dropdown)
router.post('/advisor_assign_form_submit', adminRoutes.advisor_assign_form_submit);
router.post('/trackProcess', adminRoutes.trackProcess);
//advisorForm
router.post('/count_check_advisor_form', adminRoutes.count_check_advisor_form);
router.post('/advisor_form_studNames_dropdown', adminRoutes.advisor_form_studNames_dropdown);
router.post('/advisor_formAssign_submit_button', adminRoutes.advisor_formAssign_submit_button);

router.post('/edit_profile', adminRoutes.edit_profile);

router.post('/change_password', adminRoutes.change_password);

// advisor_formassign_submit_button



router.post('/login_new', adminRoutes.login_new)
module.exports = router;