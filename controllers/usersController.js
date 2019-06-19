const path = require('path')
const Users = require('../models/Users')

exports.index = (req, res, next) => {
  res.render('user/dashboard', {
    title: 'Welcome', content: 'Placeholder for user landing page'
  })
}

exports.login = (req, res, next) => {
  res.render('user/login', {
    title: 'Welcome - Please Login!'
  })
}

exports.add = (req, res, next) => {
  res.render('user/add', {
    title: 'Add User',
    roles: (Users.schema) ? Users.schema.path('role').enumValues : ['Admin', 'Editor', 'Author']
  })
}
