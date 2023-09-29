import express from 'express';
import { signUp, logIn } from '../controllers/user.controller';
import asyncWrapper from '../utils/asyncWrapper';
import { createUserSchema, logInSchema } from '../schema/user.schema';
import validate from '../middleware/validateResource';

const router = express.Router();

router
  .route('/register')
  .post(validate(createUserSchema), asyncWrapper(signUp));
router.route('/login').post(validate(logInSchema), asyncWrapper(logIn));

export default router;
