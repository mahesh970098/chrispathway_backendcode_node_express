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

exports.admincreateUser = (name, phone_no, role_id, designation, joined_on, email, password, callback) => {
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
                QRY_TO_EXEC = `insert into users_dtl_t (email, pwd, role, user_name,designation, phone_no, joined_on) values("${email}","${password}","${role_id}","${name}","${designation}","${phone_no}","${joined_on}");`
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


exports.roles = ( callback) => {
    let cntxtDtls = "Get roles api";
    QRY_TO_EXEC = `SELECT * FROM charispathway.roles_table where status=1;`
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