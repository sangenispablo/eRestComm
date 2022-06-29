const admin = process.env.ADMIN;

const isAdmin = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  if (admin === "false") {
    return res.status(400).json({ msg: `No tiene permiso para ${url}` });
  }
  next();
};

module.exports = { isAdmin };
