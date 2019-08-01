let Student = require('../models/student_model'),
    Examiner = require('../models/examiner_model'),
    Administer = require('../models/administer_model');

/* register controller */
module.exports.register = function (sid, name, email, pwd, req, res) {
    Student.create({sid: sid, name: name, email: email, password: pwd, avatar: '0.jpeg'}, function (err) {
            if (err) {
                res.send('<p>SID/Email exists.</p>');
                return;
            }
            req.session.sid = sid;
            req.session.name = name;
            req.session.email = email;
            req.session.avatar = '0.jpeg';
            res.redirect('/students/' + sid);
        }
    )
};

/* login controller */
module.exports.login = function (userId, pwd, role, req, res) {
    // student login
    if (role === 'Student') {
        Student.findBySIDAndPwd(userId, pwd, function (err, data) {
            if (err)
                throw err;
            if (data) {
                req.session.role = "student";
                req.session.user_id = data.sid;
                req.session.name = data.name;
                req.session.email = data.email;
                req.session.avatar = data.avatar ? data.avatar : '0.jpeg';
                res.redirect('/students/' + data.sid);
            }
            else {
                res.redirect('/login')
            }
        })
    }

    // examiner login
    if (role === 'Examiner') {
        Examiner.findBySIDAndPwd(userId, pwd, function (err, data) {
            if (err)
                throw err;
            if (data) {
                req.session.role = "examiner";
                req.session.user_id = data.eid;
                req.session.name = data.name;
                req.session.email = data.email;
                req.session.avatar = data.avatar ? data.avatar : '0.jpeg';
                res.redirect('/examiners/' + data.eid);
            }
            else {
                res.redirect('/login')
            }
        })
    }

    // administer login
    if (role === 'Administer') {
        Administer.findBySIDAndPwd(userId, pwd, function (err, data) {
            if (err)
                throw err;
            if (data) {
                req.session.role = "administer";
                req.session.user_id = data.aid;
                req.session.name = data.name;
                req.session.email = data.email;
                req.session.avatar = data.avatar ? data.avatar : '0.jpeg';
                res.redirect('/administers/' + data.aid);
            }
            else {
                res.redirect('/login')
            }
        })
    }
};