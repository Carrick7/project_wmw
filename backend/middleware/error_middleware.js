//Functions that run when a request is made
const errorHandler = (err, req, res, next) => {
  const status_code = res.status_code ? res.status_code : 500;

  res.status(status_code);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

module.exports = {
  errorHandler,
}