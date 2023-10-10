import express from 'express';
import {
  createCompany,
  updateCompany,
  storeCompany,
} from '../controllers/company.controller';
import requireUser from '../middleware/requireUser';
import authorizeUser from '../middleware/authorizeUser';
import { companySchema } from '../schema/company.schema';
import validate from '../middleware/validateResource';
import asyncWrapper from '../utils/asyncWrapper';

const router = express.Router();

router
  .route('/')
  .get(requireUser, authorizeUser(['admin']), asyncWrapper(createCompany))
  .post(
    validate(companySchema),
    requireUser,
    authorizeUser(['admin']),
    asyncWrapper(storeCompany)
  )
  .put(
    validate(companySchema),
    requireUser,
    authorizeUser(['admin']),
    asyncWrapper(updateCompany)
  );

export default router;
