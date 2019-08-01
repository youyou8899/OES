let mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
    student_id: String,
    exam_id: String,
    is_cheater: Boolean,
    answers: Array,
    is_marked: Boolean
});

module.exports = mongoose.model('answer', answerSchema);