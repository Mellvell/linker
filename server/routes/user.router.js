const { Router } = require('express');
const userController = require('../controllers/user.controller');
const validation = require('../middleware/validate/validate.registration');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

const userRouter = Router();

userRouter.post('/registration', validation.validateRegistration,  userController.registration);
userRouter.post('/login', validation.validateLogin, userController.login);
userRouter.put('/update', authMiddleware, upload.single('avatar'), userController.updateUser);
userRouter.post('/logout', userController.logout);
userRouter.get('/refresh', userController.refresh); 

userRouter.get('/getUser/:userId', authMiddleware, userController.getUser);
userRouter.get('/getSearchUser', authMiddleware, userController.getSearchUser);

module.exports = userRouter;
