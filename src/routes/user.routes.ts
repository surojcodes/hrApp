import express from 'express';
import { signUp } from '../controllers/user.controller';
import asyncWrapper from '../utils/asyncWrapper';
import { createUserSchema } from '../schema/user.schema';
import validate from '../middleware/validateResource';

const router = express.Router();

router.route('/').post(validate(createUserSchema), asyncWrapper(signUp));

export default router;
