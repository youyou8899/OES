let express = require('express');
let router = express.Router();
let examController = require('../controllers/exam_controller');
let profileController = require('../controllers/profile_controller');
let markController = require('../controllers/mark_controller');
let authCheck = require('../middlewares/auth_middleware');
router.use(authCheck);

/* GET student home page. */
router.get('/:id', function (req, res, next) {
    res.render('generals/home_view', {
        title: 'OES',
        role: req.session.role,
        user_id: req.session.user_id,
        name: req.session.name,
        avatar: '/images/avatars/' + req.session.avatar
    });
});

/* GET student profile page. */
router.get('/:id/profile', profileController.getProfile);

/* Upload new avatar. */
router.post('/:id/profile', profileController.updateAvatar);

/* GET exam list page. */
router.get('/:id/exams',examController.showExamList);

/* GET exam details, processing face checker. */
router.get('/:id/exams/:eid', function (req, res, next) {
    let examID = req.params.eid;
    examController.showExamDetail(examID, req, res, next)
});

/* GET exam page. */
router.get('/:id/exams/:eid/take-exam', function (req, res, next) {
    let examId = req.params.eid;
    examController.takeAnExam(examId, req, res)
});

/* finish an exam, build and save answers data */
router.post('/:id/exams/:eid/finish', examController.finishExam);

/* GET marks page. */
router.get('/:id/marks',markController.showMarkList);

module.exports = router;
