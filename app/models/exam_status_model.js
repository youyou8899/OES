let mongoose = require('mongoose');

let examStatusSchema = new mongoose.Schema({
    student_id: String,
    exam_id: String,
    status: String,
});

examStatusSchema.statics.findExamsBySID = function (sid, callback) {
    return this.find({student_id: sid}, function (err, data) {
        if (err)
            throw err;
        callback(data);
    });
};

module.exports = mongoose.model('exam_status', examStatusSchema, 'exam_status');