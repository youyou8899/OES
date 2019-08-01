let Student = require('../models/student_model');
let Examiner = require('../models/examiner_model');

/* show student list. */
module.exports.showStudentList = function (req, res, next) {
    Student.findAll(function (studentList) {
        res.render('administers_views/student_list_view', {
            title: 'Student management',
            role: req.session.role,
            name: req.session.name,
            user_id: req.session.user_id,
            avatar: '/images/avatars/' + req.session.avatar,
            student_list: studentList
        });
    });
};

/* delete a student by his/her sid. */
module.exports.deleteStudent = function (sid, req, res, next) {
    Student.deleteBySid(sid, function () {
        res.redirect('/administers/' + req.session.user_id + '/student_mgt/')
    })
};

/*show examiner list*/
module.exports.showExaminerList = function (req, res, next) {
    Examiner.findAll(function (examinerList) {
        res.render('administers_views/examiner_list_view', {
            title: 'Examiner management',
            role: req.session.role,
            name: req.session.name,
            user_id: req.session.user_id,
            avatar: '/images/avatars/' + req.session.avatar,
            examiner_list: examinerList
        });
    });
};

/*delete a examiner by his/her eid*/
module.exports.deleteExaminer = function (eid, req, res, next) {
    Examiner.deleteByEid(eid, function () {
        res.redirect('/administers/' + req.session.user_id + '/examiner_mgt/')
    })
};

/* show profile of a student or an examiner */
module.exports.showProfile = function (role, userId, req, res, next) {
    if (role === 'student') {
        Student.findBySID(userId, function (err, data) {
            if (err)
                throw err;
            if (data) {
                res.render('administers_views/edit_view', {
                    title: 'Student ' + userId,
                    student: data,
                    role: req.session.role,
                    user_id: req.session.user_id,
                    name: req.session.name,
                    avatar: '/images/avatars/' + req.session.avatar
                })
            }
        })
    }

    if (role === 'examiner') {
        Examiner.findByEid(userId, function (err, data) {
            if (err)
                throw err;
            if(data){
                res.render('administers_views/edit_view',{
                    title: 'Examiner' + userId,
                    examiner: data,
                    role: req.session.role,
                    user_id: req.session.usr_id,
                    name: req.session.name,
                    avatar: '/images/avatars/' + req.session.avatar
                })
            }

        })
    }
};

/* update profile */
module.exports.updateEdit = function (role, req, res, next) {
    if (role === 'student') {
        Student.updateProfile(req.body.sid, req.body.name, req.body.email, function (err) {
            if (err)
                throw err;
            res.redirect('/administers/' + req.session.user_id + '/student_mgt');
        })
    }
    if (role === 'examiner') {
        Examiner.updateProfile(req.body.eid, req.body.name, req.body.email, function (err) {
            if (err)
                throw err;
            res.redirect('/administers/' + req.session.user_id + '/examiner_mgt');
        })
    }
};