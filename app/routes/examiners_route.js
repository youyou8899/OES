let express = require('express');
let router = express.Router();
let examController = require('../controllers/exam_controller');
let authCheck = require('../middlewares/auth_middleware');
router.use(authCheck);

/* GET examiner home page. */
router.get('/:id', function (req, res, next) {
    res.render('generals/home_view', {
        title: 'OES',
        role: req.session.role,
        user_id: req.session.user_id,
        name: req.session.name,
        avatar: '/images/avatars/' + req.session.avatar
    });
});

/* Get create an exam. */
router.get('/:id/exams', function (req, res, next) {
    res.render('examiners_views/exam_list_view', {
        title: 'Create'
    })
});

/* POST create an exam. */
router.post('/:id/exams', function (req, res, next) {
    let exam_id = req.body.exam_id,
        title = req.body.title,
        due_date = req.body.due_date,
        duration = Number(req.body.duration),
        questions = req.body.questions,
        // answers = req.body.answers,
        examiner = req.session.name,
        detail = req.body.detail;

    examController.create(exam_id, title, due_date, duration, questions, examiner,detail, req, res);
});


module.exports = router;