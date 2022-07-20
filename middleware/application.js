const application = function (req, res, next) {
  const id = process.env.APP_ID;
  const title = `${process.env.APP_NAME} Application`; 
  const devopsName = process.env.APP_DEVOPS_NAME;

  res.locals.id = id;
  res.locals.title = title;
  res.locals.devopsName = devopsName;

  next();
}

module.exports = application;
