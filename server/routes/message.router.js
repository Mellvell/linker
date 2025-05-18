const routerMessage = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');

routerMessage.get('/', authMiddleware, (req, res) => {
  console.log(req.user);
  res.send('Hello World');
});

module.exports = routerMessage;

