import express from 'express';
import { signIn } from '../controllers/user.controller';
import asyncWrapper from '../utils/asyncWrapper';
const router = express.Router();

router.route('/').post(asyncWrapper(signIn));

export default router;
