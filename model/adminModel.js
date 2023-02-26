const { message } = require("../config/error_codes");

exports.login = (email, password, callback) => {
    let cntxtDtls = "Get login api";
    QRY_TO_EXEC = `SELECT * FROM users_dtl_t where email=?`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [email], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            if (results.length == 0) {
                callback(0, null, 1)
                return
            }
            else {
                QRY_TO_EXEC = `SELECT * FROM users_dtl_t where email=? and pwd=? `
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [email, password], function (err, results1) {
                    if (results1 == 0) {
                        callback(err, null, 2)
                        return
                    }
                    else {
                        callback(err, results1)
                        return
                    }
                })
            }
        }
    })
}

exports.admincreateUser = (name, phone_no, role_id, designation, joined_on, email, password, offer_letter_location, callback) => {
    let cntxtDtls = "Get admincreateUser api";
    QRY_TO_EXEC = `SELECT * FROM users_dtl_t where email=? and role=? and phone_no=?;`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [email, role_id, phone_no], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            if (results.length > 0) {
                callback(0, null, 1)
                return
            }
            else {
                console.log(email)

                QRY_TO_EXEC = `insert into users_dtl_t (email, pwd, role, user_name,designation, phone_no, joined_on,offerletter_upload,c_by) 
                values("${email}","${password}","${role_id}","${name}","${designation}","${phone_no}","${joined_on}","${offer_letter_location}",1);`
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results1) {
                    console.log(results1.insertId, "^^^^")
                    QRY_TO_EXEC = `select * from users_dtl_t where id=?;`
                    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [results1.insertId], function (err, results18) {
                        callback(err, results18)

                        return

                    })




                })
            }
        }
    })
}
exports.roles = (callback) => {
    let cntxtDtls = "Get roles api";
    QRY_TO_EXEC = `SELECT * FROM roles_table where status=1;`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.creating_task = (task_name, task_desc, created_role_id, c_by, callback) => {
    let cntxtDtls = "Get creating_task api";
    QRY_TO_EXEC = `select * from tasks_dlt_t where task_name=? and task_desc=?`

    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [task_name, task_desc], function (err, results11) {
        if (results11.length > 0) {
            callback(err, null, 1)
            return
        }
        else {
            QRY_TO_EXEC = `insert into tasks_dlt_t(task_name, task_desc, created_role_id, c_by) values(?)`
            let values = [task_name, task_desc, created_role_id, c_by]
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [values], function (err, results) {
                if (err) {
                    callback(err, 0)
                    return
                }
                else {
                    QRY_TO_EXEC1 = `select * from tasks_dlt_t where id=?`
                    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, [results.insertId], function (err, results1) {

                        callback(err, results1)
                        return
                    })
                }
            })
        }
    })
}

exports.view_task = (logged_user_id, year, status, callback) => {
    let cntxtDtls = "Get view_task api";


    if (year != 0) {
        QRY_TO_EXEC = `SELECT * FROM tasks_dlt_t where c_by=${logged_user_id}  and   is_active=1 and year(c_ts)='${year}' and status='${status}';`

    }
    else {
        QRY_TO_EXEC = `SELECT * FROM tasks_dlt_t where c_by=${logged_user_id} and status="In Progress" and is_active=1;`
    }


    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.view_task_status_update = (logged_user_id, status, task_id, callback) => {
    let cntxtDtls = "Get view_task_status_update api";
    if (status == "Delete") {
        QRY_TO_EXEC = `update tasks_dlt_t set status=? ,u_by =? , is_active=0 where id=?;`
    }
    else {
        QRY_TO_EXEC = `update tasks_dlt_t set status=? ,u_by =? where id=?;`
    }

    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [status, logged_user_id, task_id], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.names_basedon_role = (logged_role_id, callback) => {
    let cntxtDtls = "Get view_task api";
    QRY_TO_EXEC = `SELECT id,user_name,email FROM users_dtl_t where role=?;`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [logged_role_id], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}


exports.send_message = (selected_role_id, selected_name, message, logged_user_id, callback) => {
    let cntxtDtls = "Get send_message api";
    QRY_TO_EXEC = `insert into send_message_dtl_t (role_id, name, message, created_by) values(?)`
    let val = [selected_role_id, selected_name, message, logged_user_id]
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [val], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            QRY_TO_EXEC = `select * from send_message_dtl_t where id=? `
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [results.insertId], function (err, results1) {
                callback(err, results1)
                return
            })
        }
    })
}
exports.notification_display = (selected_role_id, logged_user_id, callback) => {
    let cntxtDtls = "Get notification_display api";
    QRY_TO_EXEC = `select s.message,u.user_name as createdby,s.c_ts as createdtime from send_message_dtl_t as s 
join users_dtl_t as u on u.id=s.created_by
 where role_id=?  and name=?;`
    // let val = [selected_role_id, selected_name, message, logged_user_id]
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [selected_role_id, logged_user_id], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return

        }
    })
}
exports.manage_roles_get = (callback) => {
    let cntxtDtls = "Get manage_roles_get api";
    QRY_TO_EXEC = `SELECT u.id,user_name,role,r.role_name,email,designation,c_ts as joined_date,phone_no,u.is_active
FROM users_dtl_t as u
join roles_table as r on r.id=u.role where role!=1 and u.is_active=1;`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return

        }
    })
}

exports.manage_roles_delete = (deleted_user_id, callback) => {
    let cntxtDtls = "Get manage_roles_delete api";
    let current_timestamp = moment().format('YYYY-MM-DD')
    QRY_TO_EXEC = `update users_dtl_t set is_active=0 , u_ts= ? , u_by=1 where id=?;`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [current_timestamp, deleted_user_id], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}
exports.advisor_todo_row_save = (student_interest, to_do_id, assign_checkbox, callback) => {
    let cntxtDtls = "Get advisor_todo_row_save api";
    let current_timestamp = moment().format('YYYY-MM-DD')
    if (student_interest == "Yes") {
        QRY_TO_EXEC = `update reverted_stud_csv_admin_t set row_time_save=?,u_ts=?,student_interest=?,assign_indicator=? where id in (?)`
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [current_timestamp, current_timestamp, 'Yes', assign_checkbox,
            to_do_id], function (err, results) {
                if (err) {
                    callback(err, 0)
                    return
                }
                else {
                    callback(err, results)
                    return
                }
            })
    }
    else if (student_interest == "No") {
        QRY_TO_EXEC = `update reverted_stud_csv_admin_t set checkbox_save=?,u_ts=?,student_interest=?,is_active=1,assigned_to=?,assigned_by=? where id in (?)`
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [current_timestamp, current_timestamp, 'No', null, null, to_do_id], function (err, results) {
            if (err) {
                callback(err, 0)
                return
            }
            else {
                callback(err, results)
                return
            }
        })
    }
    else {
        QRY_TO_EXEC = `update reverted_stud_csv_admin_t set checkbox_save=?,u_ts=?,student_interest=?,is_active=1,assigned_to=?,assigned_by=? where id in (?)`
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [current_timestamp, current_timestamp, 'Future Followup', null, null, to_do_id], function (err, results) {
            if (err) {
                callback(err, 0)
                return
            }
            else {
                callback(err, results)
                return
            }
        })
    }

}

exports.advisor_assign_stud_dropdown = (callback) => {
    let cntxtDtls = "Get advisor_todo_row_save api";
    let current_timestamp = moment().format('YYYY-MM-DD')

    QRY_TO_EXEC = `SELECT id as student_id,Studen_Name,email_id,country_interested FROM reverted_stud_csv_admin_t where student_interest='Yes' and assign_indicator=1;`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.advisor_assign_advisorname_dropdown = (logged_user_id, callback) => {
    let cntxtDtls = "Get advisor_assign_advisorname_dropdown api";
    let current_timestamp = moment().format('YYYY-MM-DD')
    QRY_TO_EXEC = `SELECT id,email,user_name FROM charispathway.users_dtl_t where role=2 and id !=?; `
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [logged_user_id], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}
exports.advisor_assign_form_submit = (logged_user_id, selected_student_id, selected_advisor_id, conflicts_faced, callback) => {
    let cntxtDtls = "Get advisor_assign_advisorname_dropdown api";
    let current_timestamp = moment().format('YYYY-MM-DD')
    QRY_TO_EXEC = `update reverted_stud_csv_admin_t set u_by=?, assigned_to = ?, assigned_by=?,student_interest=null,assign_indicator=0,u_ts=? where id in (?);`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [logged_user_id, selected_advisor_id, logged_user_id, current_timestamp, selected_student_id], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.admin_csv_upload = (multiple_record_file, callback) => {
    let cntxtDtls = "Get admin_csv_upload api";
    QRY_TO_EXEC = `LOAD DATA LOCAL INFILE "filestorage/adminCSV/${multiple_record_file}" INTO TABLE reverted_stud_csv_admin_t 
    FIELDS TERMINATED BY ',' 
    LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
    (Studen_Name, phone_no, email_id, country_interested);`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return

        }
    })
}

exports.reverted_stud_list_csv = (logged_user_id, role_id, callback) => {
    let cntxtDtls = "Get reverted_stud_list_csv api";
    let QRY_TO_EXEC = ''
    if (role_id == 1) {
        QRY_TO_EXEC = `select * from reverted_stud_csv_admin_t where is_active=1`
    }
    else {
        QRY_TO_EXEC = `select * from reverted_stud_csv_admin_t where is_active=0 and assigned_to=${logged_user_id}`
    }

    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.reverted_stud_save_button = (logged_user_id, selected_user_id, selected_checkbox_id, callback) => {
    let cntxtDtls = "Get reverted_stud_save_button api";
    QRY_TO_EXEC = `update reverted_stud_csv_admin_t set is_active=0, assigned_to=${selected_user_id},assigned_by=${logged_user_id}
    where id in (${selected_checkbox_id});`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.admin_reverted_list_get = (callback) => {
    let cntxtDtls = "Get admin_reverted_list_get api";
    QRY_TO_EXEC = `SELECT * FROM charispathway.reverted_stud_csv_admin_t 
    where student_interest='No' or student_interest='Future Followup' and is_active=1;`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.admin_reverted_list_delete = (id,callback) => {
    let cntxtDtls = "Get admin_reverted_list_delete api";
    QRY_TO_EXEC = `delete from reverted_stud_csv_admin_t where id in (?);`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [id], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.advisor_create_student = ( email, password, callback) => {
    let cntxtDtls = "Get advisor_todo_row_save api";
    QRY_TO_EXEC = `insert into users_dtl_t(user_name,phone_no,email,pwd,c_by,role) values(?)`
    let values = [username, phoneNumber, email, password, created_user_id, 4]
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [values], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            callback(err, results)
            return
        }
    })
}

exports.login_new = (email, password, callback) => {
    let cntxtDtls = "Get login_new api";
    QRY_TO_EXEC = `SELECT * FROM user_new where email=?`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [email], function (err, results) {
        if (err) {
            callback(err, 0)
            return
        }
        else {
            if (results.length == 0) {
                callback(0, null, 1)
                return
            }
            else {
                QRY_TO_EXEC = `SELECT * FROM user_new where email=? and pwd=? `
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [email, password], function (err, results1) {
                    if (results1 == 0) {
                        callback(err, null, 2)
                        return
                    }
                    else {
                        callback(err, results1)
                        return
                    }
                })
            }
        }
    })
}
