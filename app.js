var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const {loadAllCheckers} =require('./controllers/urlChecker/urlChecker.controller')

require('dotenv').config()
require('./DB/connection/mongoDB.con')

const PORT = process.env.PORT || 3000
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var authRouter = require('./routes/auth')
var indexRouter = require('./routes/index');
var urlChecks = require('./routes/urlChecks')


app.use('/', indexRouter)
app.use('/auth',authRouter)
app.use('/url', urlChecks)

app.use(function(req, res, next) {next(createError(404))});
app.listen(PORT, ()=>{ console.log("CONN", PORT) })
loadAllCheckers()
module.exports = app;
