let Student = require('../models/student_model');

module.exports = function (req, res, next) {
    if (req.session.name)
        next();
    else
        res.redirect('/login');
};