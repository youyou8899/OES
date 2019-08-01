let mongoose = require('mongoose');

let examSchema = new mongoose.Schema({
    exam_id: {type: String, unique: true, required: true},
    due_date: String,
    title: String,
    duration: Number,
    questions: Array,
    examiner: String,
    detail: String
});

/* find exams whose exam_id is contained in a given list. */
examSchema.statics.findByIDs = function (idList, callback) {
    return this.find({exam_id: {$in: idList}}, function (err, data) {
        if (err)
            throw err;
        callback(data);
    })
};

/* find an exam by exam_id */
examSchema.statics.findByID = function(id, callback){
    return this.findOne({exam_id: id}, function (err, data) {
        if(err)
            throw err;
        callback(data);
    })
};

examSchema.statics.findWithoutIds = function(idList, callback) {
    return this.find({exam_id: {$nin: idList}}, function (err, data) {
        if (err)
            throw err;
        callback(data);
    })
};

module.exports= mongoose.model('exam', examSchema);