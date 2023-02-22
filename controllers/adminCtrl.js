const adminModel = require('../model/adminModel');

exports.login = (async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log("hi")
    adminModel.login(email, password, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting Meeting Data ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            if (flag == 1) {
                res.send({ "result": "Fail", "Message": "Email Does not Exists!" });
                return;
            }
            else if (flag == 2) {
                res.send({ "result": "Fail", "Message": "Incorrect password!" });
                return;
            }
            else {

                res.send({ "result": "success", "data": Data18 });
                return;
            }
        }

    });


})
exports.admincreateUser = (async (req, res) => {
    let name = req.body.name;
    let phone_no = req.body.phone_no;
    let role_id = req.body.role_id;
    let designation = req.body.designation;
    let joined_on = req.body.joined_on;
    let email = req.body.email;
    let password = req.body.password;
    let offer_letter_location = '';
    let current_timestamp = moment().format("yyyyMMDDHHmmss")

    console.log(current_timestamp)




    if (req.files) {
        if (!fs.existsSync("./filestorage/create_user_upload")) {
            fs.mkdirSync("./filestorage/create_user_upload", { recursive: true });
        }
        if (req.files.offer_letter) {
            if (req.files.offer_letter[0].mimetype === 'image/png' || req.files.offer_letter[0].mimetype === 'image/jpeg' ||
                req.files.offer_letter[0].mimetype === 'image/jpg' || req.files.offer_letter[0].mimetype === 'application/pdf') {
                offer_letter_location = current_timestamp + "_" + req.files.offer_letter[0].originalname;
                offer_letter_location = "./filestorage/create_user_upload" + current_timestamp + "_" + req.files.offer_letter[0].originalname;
                await fs.writeFile("./filestorage/create_user_upload" + current_timestamp + "_" + req.files.offer_letter[0].originalname, req.files.offer_letter[0].buffer, async function (err) {
                    if (err) {
                        logger.error('Error While Getting bank file creating ', err);
                        res.send({ "code": stdCodes.message.serverError.code, "message": stdCodes.message.serverError.message });
                        return;
                    }
                });
            }
            else {
                res.send({ "code": stdCodes.message.userExits.code, "message": "Uploaded Offer Letter  Invalid Format" })
                return;
            }
        }
    }

    console.log("hi")
    console.log(email, "email")
    adminModel.admincreateUser(name, phone_no, role_id, designation, joined_on, email, password, offer_letter_location, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting Meeting Data ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            if (flag == 1) {
                res.send({ "result": "Fail", "Message": "User Already Exists for this Role" });
                return;
            }
            else if (flag == 2) {
                res.send({ "result": "Fail", "Message": "Incorrect password!" });
                return;
            }
            else {

                res.send({ "result": "success", "Message": "User Created Successfully", "data": Data18 });
                return;
            }
        }

    });
})

exports.roles = (async (req, res) => {
    console.log("hi")
    adminModel.roles(async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting Meeting Data ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "data": Data18 });
            return;
        }
    });
})

exports.creating_task = (async (req, res) => {
    let task_name = req.body.task_name;
    let task_desc = req.body.task_desc;
    let created_role_id = req.body.logged_role_id;
    let c_by = req.body.logged_user_id;
    // let task_name = req.body.task_name;
    console.log("hi")
    adminModel.creating_task(task_name, task_desc, created_role_id, c_by, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While creating_task ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            if (flag == 1) {
                res.send({ "result": "success", "message": "Task Name and Task Description Already Exists!" });
                return;
            }
            else {
                res.send({ "result": "success", "message": "Created Successfully.", "Data": Data18 });
                return;
            }
        }
    });
})

exports.view_task = (async (req, res) => {
    let logged_user_id = req.body.logged_user_id;
    let year = req.body.year;
    console.log("hi")
    adminModel.view_task(logged_user_id, year, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting view_task ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "data": Data18 });
            return;
        }
    });
})

exports.view_task_status_update = (async (req, res) => {
    let logged_user_id = req.body.logged_user_id;
    let status = req.body.status;
    let task_id = req.body.task_id;
    console.log("hi")
    adminModel.view_task_status_update(logged_user_id, status, task_id, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting view_task ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "Message": "Updated Successfully" });
            return;
        }
    });
})

exports.names_basedon_role = (async (req, res) => {
    let logged_role_id = req.body.logged_role_id;
    console.log("hi")
    adminModel.names_basedon_role(logged_role_id, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting names_basedon_role ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "data": Data18 });
            return;
        }
    });
})
exports.send_message = (async (req, res) => {
    let selected_role_id = req.body.selected_role_id;
    let selected_name = req.body.selected_name_id;
    let message = req.body.message;
    let logged_user_id = req.body.logged_user_id;
    console.log("hi")
    adminModel.send_message(selected_role_id, selected_name, message, logged_user_id, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting names_basedon_role ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "data": Data18 });
            return;
        }
    });
})
exports.notification_display = (async (req, res) => {
    let selected_role_id = req.body.selected_role_id;
    let logged_user_id = req.body.logged_user_id;
    console.log("hi")
    adminModel.notification_display(selected_role_id, logged_user_id, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting notification_display ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "data": Data18 });
            return;
        }
    });
})
exports.manage_roles_get = (async (req, res) => {
    console.log("hi")
    adminModel.manage_roles_get(async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting names_basedon_role ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "data": Data18 });
            return;
        }
    });
})

exports.manage_roles_delete = (async (req, res) => {
    let deleted_user_id = req.body.deleted_user_id
    console.log("hi")
    adminModel.manage_roles_delete(deleted_user_id, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting manage_roles_delete ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "Message": "User Deleted Successfully." });
            return;
        }
    });
})

exports.advisor_todo_row_save= (async (req, res) => {
    let student_interest = req.body.student_interest;
    let to_do_id = req.body.to_do_id
    let assign_checkbox = req.body.assign_checkbox
    console.log("hi")
    adminModel.advisor_todo_row_save(student_interest, to_do_id, assign_checkbox,async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting manage_roles_delete ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "Message": "Submitted Successfully" });
            return;
        }
    });
})

exports.advisor_create_student = (async (req, res) => {
    let username = req.body.username;
    let phoneNumber = req.body.phoneNumber;
    let email = req.body.email;
    let password = req.body.password;
    let created_user_id = req.body.logged_user_id;
    console.log("hi")
    adminModel.advisor_create_student(username, phoneNumber, email, password, created_user_id, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting manage_roles_delete ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "Message": "Created Successfully" });
            return;
        }
    });
})

exports.advisor_assign_stud_dropdown = (async (req, res) => {
    console.log("hi")
    adminModel.advisor_assign_stud_dropdown(async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting manage_roles_delete ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "Data": Data18 });
            return;
        }
    });
})

exports.advisor_assign_advisorname_dropdown = (async (req, res) => {
    let logged_user_id=req.body.logged_user_id
    console.log("hi")
    adminModel.advisor_assign_advisorname_dropdown(logged_user_id,async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting manage_roles_delete ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "Data": Data18 });
            return;
        }
    });
})

exports.advisor_assign_form_submit = (async (req, res) => {
    let logged_user_id = req.body.logged_user_id
    let selected_student_id=req.body.selected_student_id;
    let selected_advisor_id=req.body.assigned_person_id;
    let conflicts_faced=req.body.conflicts_faced
    console.log("hi")
    adminModel.advisor_assign_form_submit(logged_user_id, selected_student_id, selected_advisor_id,conflicts_faced,async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting manage_roles_delete ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "Message":"Assigned Successfully"});
            return;
        }
    });
})

exports.admin_csv_upload = (async (req, res) => {
    let current_timestamp = moment().format('YYYYMMDDHHmmss');
    // console.log(req.files,"files log::::::::")
    let multiple_record_file = current_timestamp + "_" + req.files.file_upload[0].originalname;
    if(req.files)
    {
      if (!fs.existsSync("./filestorage/adminCSV")){
        fs.mkdirSync("./filestorage/adminCSV", { recursive: true });
    }
    await fs.writeFile("./filestorage/adminCSV/" + current_timestamp + "_" + req.files.file_upload[0].originalname, req.files.file_upload[0].buffer,async function(err) {
        if(err) {
           logger.error('Error While Getting AssetDetails_Multiple_record %s', err);
        res.send({ "code": stdCodes.message.serverError.code, "message": stdCodes.message.serverError.message });
        return;
        }
        else{
            console.log("hi", multiple_record_file)
            adminModel.admin_csv_upload(multiple_record_file,async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting notification_display ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "message" :"File Uploaded Successfully"});
            return;
        }
    });
}
        })
    }
})

exports.reverted_stud_list_csv = (async (req, res) => {
    console.log("hi")
    let logged_user_id=req.body.logged_user_id;
    let  role_id=req.body.role_id;
    adminModel.reverted_stud_list_csv(logged_user_id, role_id,async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting reverted_stud_list_csv ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "data": Data18 });
            return;
        }
    });
})

exports.reverted_stud_save_button= (async (req, res) => {
    console.log("hi")
    let logged_user_id = req.body.logged_user_id;
    let selected_user_id = req.body.selected_user_id;
    let selected_checkbox_id=req.body.selected_checkbox_id
    adminModel.reverted_stud_save_button(logged_user_id, selected_user_id, selected_checkbox_id, async (err, Data18, flag) => {
        if (err) {
            logger.error('Error While Getting reverted_stud_save_button ', err);
            res.send({ "result": stdCodes.message.serverError.code, "message": "" });
            return;
        }
        else {
            res.send({ "result": "success", "message":"Assigned Successfully" });
            return;
        }
    });
})