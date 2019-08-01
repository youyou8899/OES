let mongoose = require('mongoose');

let markSchema = new mongoose.Schema({
    student_id: String,
    exam_id: String,
    exam_title: String,
    mark: Number,
    examiner_id: String
});

markSchema.statics.findMarksBySid = function (sid, callback) {
    return this.find({student_id: sid}, function (err, data) {
        if (err)
            throw err;
        callback(data);
    })
};

module.exports = mongoose.model('mark', markSchema);
