let Student = require('../models/student_model'),
    ExamStatus = require('../models/exam_status_model'),
    Exam = require('../models/exam_model'),
    Answer = require('../models/answer_model');

module.exports.takeAnExam = function (examId, req, res, next) {
    Exam.findByID(examId, function (exam) {
        res.render('students_views/exam_view', {
            title: 'Exam' + exam.exam_id,
            role: req.session.role,
            user_id: req.session.user_id,
            avatar: '/images/avatars/' + req.session.avatar,
            name: req.session.name,
            exam: exam
        })
    })
};

/* get all exams the logged-in student has. */
module.exports.showExamList = function (req, res, next) {
    let student_id = req.session.user_id;

    // find exam_ids relative with this student
    ExamStatus.findExamsBySID(student_id, function (examStatusList) {
        let examIDs = [];
        examStatusList.forEach(function (status) {
            examIDs.push(status.exam_id);
        });

        // find exam details according exam_ids
        Exam.findByIDs(examIDs, function (takenExams) {
            Exam.findWithoutIds(examIDs, function (untakenExams) {
                res.render('students_views/exam_list_view', {
                    title: 'Exams',
                    name: req.session.name,
                    role: req.session.role,
                    user_id: req.session.user_id,
                    email: req.session.email,
                    avatar: '/images/avatars/' + req.session.avatar,
                    untakenExams: untakenExams,
                    takenExams: takenExams
                });
            });
        });
    });
};

/* show details of a exam that student take, this page also has face comparison function to identify a valid candidate. */
module.exports.showExamDetail = function (examID, req, res, next) {
    Exam.findByID(examID, function (exam) {
        res.render('students_views/exam_detail_view', {
            title: 'Exam' + exam.exam_id,
            exam: exam,
            avatar: '/images/avatars/' + req.session.avatar,
            role: req.session.role,
            name: req.session.name,
            user_id: req.session.user_id
        })
    })
};

/* this controller is called when a student finishes an exam and uploads answers.
* save student's answers, change exam status into 'taken' */
module.exports.finishExam = function (req, res, next) {
    let answer = new Answer({
        student_id: req.body.sid,
        exam_id: req.body.exam_id,
        is_cheater: req.body.is_cheater,
        answers: JSON.parse(req.body.answers),
        is_marked:req.body.is_marked
    });
    // save answers
    answer.save(function (err) {
        if (err)
            throw err;
        // change exam status
        let examStatus = new ExamStatus({
            exam_id: req.body.exam_id,
            student_id: req.body.sid,
            status: 'taken'
        });
        examStatus.save(function (err) {
            if (err)
                throw err;
            res.json(1);
        })
    });
};

module.exports.create = function (exam_id, title, due_date, duration, questions, examiner, detail, req, res) {
    let userId = req.session.user_id;
    Exam.create({exam_id: exam_id, title: title, due_date: due_date, duration: duration, questions:[questions], examiner:examiner, detail:detail}, function (err) {
            if (err) {
                throw err;
            }
            // req.session.exam_id = exam_id;
            // req.session.title = title;
            // req.session.due_date = due_date;
            // req.session.duration = duration;
            // req.session.questions = questions;
            // req.session.examiner = examiner;
            // req.session.detail = detail;
            res.redirect('/examiners/' + userId);
        }
    )
};
