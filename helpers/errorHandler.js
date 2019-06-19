module.exports = (reason, promise) => {
  console.error('%O failed!\n%s\nFile: %s, Line: %d',
    promise,
    reason.message,
    reason.fileName,
    reason.lineNumber)
}
