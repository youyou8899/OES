let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    sid: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    avatar: String
});

/* find student by SID */
studentSchema.statics.findBySID = function (sid, callback) {
    return this.findOne({'sid': sid}).exec(callback);
};

/* find student by SID and Password */
studentSchema.statics.findBySIDAndPwd = function (sid, pwd, callback) {
    return this.findOne({'sid': sid, 'password': pwd}).exec(callback);
};

/* find all students */
studentSchema.statics.findAll = function (callback) {
    return this.find({}, function (err, data) {
        if (err)
            throw err;
        callback(data);
    })
};

/* delete a student by sid */
studentSchema.statics.deleteBySid = function (sid, callback) {
    return this.find({sid: sid}).remove(function (err) {
        if (err)
            throw err;
        callback();
    })
};

/* update student profile. */
studentSchema.statics.updateProfile = function (sid, name, email, callback) {
    return this.updateOne({sid, sid}, {$set: {name: name, email: email}}, callback)
};


module.exports = mongoose.model('student', studentSchema);
