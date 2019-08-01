let Mark = require('../models/mark_model.js');

module.exports.showMarkList = function (req, res, next) {
    let sid = req.params.id;

    // find all marks of this student
    Mark.findMarksBySid(sid, function (data) {
        // console.log(data)
        res.render('students_views/marks_view', {
            title: 'Marks',
            name: req.session.name,
            role: req.session.role,
            user_id: req.session.user_id,
            email: req.session.email,
            avatar: '/images/avatars/' + req.session.avatar,
            marks: data
        })
    });
};

