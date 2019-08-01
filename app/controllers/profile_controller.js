let Student = require('../models/student_model'),
    Examiner = require('../models/examiner_model'),
    Administer = require('../models/administer_model'),
    ExamStatus = require('../models/exam_status_model'),
    Exam = require('../models/exam_model');


module.exports.getProfile = function (req, res) {
    // ExamStatus.
    res.render('generals/profile_view', {
        title: req.session.name,
        role: req.session.role,
        user_id: req.session.user_id,
        email: req.session.email,
        avatar: '/images/avatars/' + req.session.avatar,
        name: req.session.name
    })
};

module.exports.updateAvatar = function (req, res, next) {
    let user_id = req.session.user_id,
        newAvatar = req.body.newAvatar;

    // update student avatar
    if (req.session.role === 'student') {
        Student.update({sid: user_id}, {$set: {avatar: newAvatar}}, function (err, data) {
            if (err)
                throw err;
            req.session.avatar = newAvatar;
            res.redirect('/students/' + user_id + '/profile');
        })
    }

    // update examiner avatar
    if (req.session.role === 'examiner') {
        Examiner.update({eid: user_id}, {$set: {avatar: newAvatar}}, function (err, data) {
            if (err)
                throw err;
            req.session.avatar = newAvatar;
            res.redirect('/examiners/' + user_id + '/profile');
        })
    }

    // update administer avatar
    if (req.session.role === 'administer') {
        Administer.update({aid: user_id}, {$set: {avatar: newAvatar}}, function (err, data) {
            if (err)
                throw err;
            req.session.avatar = newAvatar;
            res.redirect('/administers/' + user_id + '/profile');
        })
    }
};
