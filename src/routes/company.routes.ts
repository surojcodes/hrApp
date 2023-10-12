import express from 'express';
import {
  getCompany,
  updateCompany,
  storeCompany,
} from '../controllers/company.controller';
import requireUser from '../middleware/requireUser';
import authorizeUser from '../middleware/authorizeUser';
import {
  createCompanySchema,
  updateCompanySchema,
} from '../schema/company.schema';
import validate from '../middleware/validateResource';
import asyncWrapper from '../utils/asyncWrapper';

const router = express.Router();

router
  .route('/')
  .post(validate(createCompanySchema), asyncWrapper(storeCompany));
router
  .route('/:id')
  .get(requireUser, asyncWrapper(getCompany))
  .put(
    validate(updateCompanySchema),
    requireUser,
    authorizeUser(['admin']),
    asyncWrapper(updateCompany)
  );

export default router;
