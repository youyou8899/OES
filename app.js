let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let app = express();

/* connect to  MongoDB */
let mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.connect(
    "mongodb://localhost/OES",
    {useNewUrlParser: true},
    function () {
        console.log("mongodb connected");
    }
);

/* set session */
let session = require("express-session");
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "OES",
        cookie: {
            maxAge: 15 * 60 * 1000
            //secure: false
        }
    })
);

/* setup flash */
let flash = require("connect-flash");
app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* set routers */
let indexRouter = require('./app/routes/home_route'),
    studentsRouter = require('./app/routes/students_route'),
    examinersRouter = require('./app/routes/examiners_route'),
    administersRouter = require('./app/routes/administers_route');
// let profileRouter = require('./app/routes/profile_route');
// let examRouter = require('./app/routes/exam_route');

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/examiners', examinersRouter);
app.use('/administers', administersRouter);
// app.use('/profile', profileRouter);
// app.use('/exams', examRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("generals/error_view");
});


module.exports = app;
