let express = require('express');
let router = express.Router();
let administerController = require('../controllers/administer_controller');
let authCheck = require('../middlewares/auth_middleware');
router.use(authCheck);

/* GET administer home page. */
router.get('/:id', function (req, res, next) {
    res.render('generals/home_view', {
        title: 'OES',
        role: req.session.role,
        user_id: req.session.user_id,
        name: req.session.name,
        avatar: '/images/avatars/' + req.session.avatar
    });
});

/* GET student management page. */
router.get('/:id/student_mgt', administerController.showStudentList);

/* GET delete student request */
router.get('/:aid/student_mgt/delete/:sid', function(req, res, next) {
    let administerId = req.params.aid,
        studentId = req.params.sid;
    administerController.deleteStudent(studentId, req, res, next);
});


/* Get examiner managerment page */
router.get('/:id/examiner_mgt', administerController.showExaminerList);

/*Get delete examiner request*/
router.get('/:aid/examiner_mgt/delete/:eid', function (req, res, next) {
    let administerId = req.params.aid,
        examinerId = req.params.eid;
    administerController.deleteExaminer(examinerId, req, res, next);

});

/* GET edit student profile page. */
router.get('/:aid/student_mgt/edit/:sid', function (req, res, next) {
    let administerId = req.params.eid,
        studentId = req.params.sid,
        role = 'student';
    administerController.showProfile(role, studentId, req, res, next);
});

/* GET edit examiner profile page.*/
router.get('/:aid/examiner_mgt/edit/:eid', function (req, res, next) {
    let administerId = req.params.aid,
        examinerId =req.params.eid,
        role = 'examiner';
    administerController.showProfile(role, examinerId, req, res, next);
});



/* POST update edit of profile */
router.post('/:aid/student_mgt/edit/:sid', function (req, res, next) {
    let administerId = req.params.aid,
        studentId = req.params.sid,
        role = 'student';
    administerController.updateEdit(role, req, res, next);
});


/*POST update edit of profile*/
router.post('/:aid/examiner_mgt/edit/:eid', function (req, res, next) {
    let administerId = req.params.aid,
        examinerId = req.params.eid,
        role = 'examiner';
    administerController.updateEdit(role, req, res, next)
});

module.exports = router;