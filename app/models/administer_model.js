let mongoose = require('mongoose');

let administerSchema = new mongoose.Schema({
    aid: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    avatar: String
});

/* find examiner by SID and Password */
administerSchema.statics.findBySIDAndPwd = function (aid, pwd, callback) {
    return this.findOne({'aid': aid, 'password': pwd}).exec(callback);
};

module.exports= mongoose.model('administer', administerSchema);