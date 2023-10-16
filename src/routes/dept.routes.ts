import express from 'express';
import asyncWrapper from '../utils/asyncWrapper';
import requireUser from '../middleware/requireUser';
import authorizeUser from '../middleware/authorizeUser';
import {
  storeDept,
  getDept,
  getDepts,
  updateDept,
  deleteDept,
  getDeptUsers,
} from '../controllers/dept.controller';

const router = express.Router();

router
  .route('/')
  .get(requireUser, authorizeUser(['admin']), asyncWrapper(getDepts))
  .post(requireUser, authorizeUser(['admin']), asyncWrapper(storeDept));
router
  .route('/:id')
  .get(requireUser, authorizeUser(['admin']), asyncWrapper(getDept))
  .patch(requireUser, authorizeUser(['admin']), asyncWrapper(updateDept))
  .delete(requireUser, authorizeUser(['admin']), asyncWrapper(deleteDept));
router
  .route('/:id/users')
  .get(requireUser, authorizeUser(['admin']), asyncWrapper(getDeptUsers));

export default router;
