const pure = require('purecss')

exports.pureCss = (module) => {
  return `<link rel="stylesheet" type="text/css" href="${pure.getFilePath(`${module}.css`)}">`
}
