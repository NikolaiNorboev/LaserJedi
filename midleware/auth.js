function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {// проверяет куки и сессию если сессие нет то уничтожает куки
    res.clearCookie("user_sid");// обрати внимание что
  }
  next();
}

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login"); // обрати внимание куда
  } else {
    next();
  }
};

module.exports = {
  sessionChecker,
  cookiesCleaner
};
