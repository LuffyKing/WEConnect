const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  const hasBearerHeader = !!bearerHeader;
  if (hasBearerHeader) {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).send({
      message: 'Missing Token authentication token'
    });
  }
};
export default verifyToken;
