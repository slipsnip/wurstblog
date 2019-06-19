const createError = require('http-errors')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const handleUncaughtPromise = require('./helpers/errorHandler')
const helpers = require('./helpers/global')
const mongoose = require('mongoose')
require('dotenv').config()

const hbs = exphbs.create({ helpers, extname: '.hbs' })
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const debug = require('debug')('wurstblog:server')
const port = process.env.PORT || 3000
const app = express()

mongoose.connect(process.env.DB, { useNewUrlParser: true })
const mongooseOptions = {
  useNewUrlParser: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
}
mongoose.connect(process.env.DB, mongooseOptions)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongoose connection to db failed'))

// view engine setup
app.engine('.hbs', hbs.engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.set('view engine', '.hbs')

// deal with unhandled promise rejections globaly
// cleaner syntax imho than wraping the contllers / try catching each
process.on('unhandledRejection', handleUncaughtPromise)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port)

module.exports = app
