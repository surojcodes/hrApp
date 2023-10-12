import express from 'express';
import {
  createUser,
  logIn,
  currentUser,
  logOut,
} from '../controllers/user.controller';
import asyncWrapper from '../utils/asyncWrapper';
import { createUserSchema, logInSchema } from '../schema/user.schema';
import validate from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';
import authorizeUser from '../middleware/authorizeUser';

const router = express.Router();

router.route('/register').post(
  validate(createUserSchema),
  requireUser,
  authorizeUser(['admin']), //admin will register the employees
  asyncWrapper(createUser)
);
router.route('/login').post(validate(logInSchema), asyncWrapper(logIn));
router.route('/currentUser').get(requireUser, asyncWrapper(currentUser));
router.route('/logout').post(requireUser, logOut);

export default router;
