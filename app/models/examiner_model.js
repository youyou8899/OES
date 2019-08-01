let mongoose = require("mongoose");

let examinerSchema = new mongoose.Schema({
    eid: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    avatar: String
});

/* find examiner by SID and Password */
examinerSchema.statics.findBySIDAndPwd = function (eid, pwd, callback) {
    return this.findOne({'eid': eid, 'password': pwd}).exec(callback);
};

/* find student by examinerID and Password */
examinerSchema.statics.findByExaminerIDAndPwd = function (
    examinerID,
    pwd,
    callback
) {
    return this.findOne({examinerID: examinerID, password: pwd}).exec(callback);
};

/* find examiner by eid */
examinerSchema.statics.findByEid = function (eid, callback) {
    return this.findOne({eid: eid}).exec(callback);
};


examinerSchema.statics.findAll = function (callback) {
    return this.find({}, function (err, data) {
        if (err)
            throw err;
        callback(data);
    })
};


/* delete a examiner by eid */
examinerSchema.statics.deleteByEid = function (eid, callback) {
    return this.find({eid: eid}).remove(function (err) {
        if (err)
            throw err;
        callback();
    })
}

examinerSchema.statics.updateProfile = function (eid, name, email, callback) {
    return this.updateOne({eid, eid}, {$set: {name: name, email: email}}, callback)
};


module.exports = mongoose.model("examiner", examinerSchema);
