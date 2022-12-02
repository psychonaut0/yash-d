const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const isAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    next()
  }
  else{
    res.status(401).json({message: "Unauthorized."})
  }
}

module.exports = {
  errorHandler,
  isAuth
};
