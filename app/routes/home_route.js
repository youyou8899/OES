let express = require('express');
let router = express.Router();
let authController = require('../controllers/auth_controller');

/* GET home page */
router.get('/', function (req, res, next) {
    res.render('generals/home_view', {
        title: 'OES'
    });
});

/* GET register page. */
router.get('/register', function (req, res, next) {
    res.render('generals/register_view', {
        title: 'Register'
    })
});

/* POST register. */
router.post('/register', function (req, res, next) {
    let sid = req.body.sid,
        name = req.body.name,
        email = req.body.email,
        pwd = req.body.password;
    authController.register(sid, name, email, pwd, req, res);
});

/* GET login page. */
router.get('/login', function (req, res, next) {
    res.render('generals/login_view', {
        title: 'Login',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
});

/* POST login page. */
router.post('/login', function (req, res, next) {
    let userId = req.body.userId,
        pwd = req.body.password,
        role = req.body.role;
    authController.login(userId, pwd, role, req, res);
});

/* GET logout. */
router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err)
            throw err;
        res.redirect('/');
    });
});

module.exports = router;
