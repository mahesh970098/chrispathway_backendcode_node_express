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

    console.log("hi")
    adminModel.admincreateUser(name, phone_no, role_id, designation, joined_on, email, password, async (err, Data18, flag) => {
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
