var dotenv = require('dotenv');
dotenv.config();
var seq = require('./sequelize');
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
const cors = require('cors');



///////////////////////////////////////////////
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tweetsRouter = require('./routes/tweet');
var likesRouter = require('./routes/like');
var commentsRouter = require('./routes/comment');
var followRouter = require('./routes/follow');
///////////////////////////////////////////////

var app = express();
app.use(cors());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'cat', cookie: { maxAge: 60000 } })); // Use the session middleware
app.use(flash()); // use connect-flash for flash messages stored in session
/////////////////////////////////////

app.get('/favicon.ico', (req, res) => res.status(204));


///////////////////////////////
///Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);
app.use('/likes', likesRouter);
app.use('/comment', commentsRouter)
app.use('/follow', followRouter)
////////////////////////////////



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render('error');
// // });

module.exports = app;
