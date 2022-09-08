const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  next();
};

module.exports = auth;
