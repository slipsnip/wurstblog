exports.index = (req, res, next) =>
  res.render('user/index', { user: 'knackwurst' })
