const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Invalid token or no token provided'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message
    });
  }

  res.status(500).json({
    error: 'Internal server error'
  });
};

module.exports = errorHandler; 