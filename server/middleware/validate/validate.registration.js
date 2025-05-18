const { body, validationResult } = require('express-validator');

class Validation {
  validateRegistration = [
    body('name')
      .notEmpty()
      .withMessage('Имя не должно быть пустым')
      .isLength({ min: 2 })
      .withMessage('Имя должно содержать минимум 2 символа'),
    body('surname')
      .notEmpty()
      .withMessage('Фамилия не должна быть пустой')
      .isLength({ min: 2 })
      .withMessage('Фамилия должна содержать минимум 2 символа'),
    body('email')
      .notEmpty()
      .withMessage('Email не должен быть пустым')
      .isEmail()
      .withMessage('Некорректный email адрес'),
    body('password')
      .notEmpty()
      .withMessage('Пароль не должен быть пустым')
      .isLength({ min: 6 })
      .withMessage('Пароль должен содержать минимум 6 символов'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ]

  validateLogin = [
    body('email')
      .notEmpty()
      .withMessage('Email не должен быть пустым')
      .isEmail()
      .withMessage('Некорректный email адрес'),
    body('password')
      .notEmpty()
      .withMessage('Пароль не должен быть пустым')
      .isLength({ min: 6 })
      .withMessage('Пароль должен содержать минимум 6 символов'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ]
}

module.exports = new Validation();
