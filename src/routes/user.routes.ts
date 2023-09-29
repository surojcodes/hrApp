import express from 'express';
import { signIn } from '../controllers/user.controller';
import asyncWrapper from '../utils/asyncWrapper';
import { createUserSchema } from '../schema/user.schema';
import validate from '../middleware/validateResource';

const router = express.Router();

router.route('/').post(validate(createUserSchema), asyncWrapper(signIn));

export default router;
