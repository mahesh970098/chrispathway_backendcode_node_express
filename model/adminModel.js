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

                QRY_TO_EXEC = `insert into users_dtl_t (email, pwd, role, user_name,designation, phone_no, joined_on,offerletter_upload) 
                values("${email}","${password}","${role_id}","${name}","${designation}","${phone_no}","${joined_on}","${offer_letter_location}");`
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

exports.view_task = (logged_user_id, year, callback) => {
    let cntxtDtls = "Get view_task api";


    if (year != 0) {
        QRY_TO_EXEC = `SELECT * FROM tasks_dlt_t where c_by=${logged_user_id}  and   is_active=1 and year(c_ts)='${year}';`

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
    QRY_TO_EXEC = `update tasks_dlt_t set status=? ,u_by =? where id=?;`
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
    QRY_TO_EXEC = `update users_dtl_t set is_active=0 where id=?;`
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, [deleted_user_id], function (err, results) {
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