import express from 'express';
import {
  getCompany,
  updateCompany,
  storeCompany,
  removeAddress,
  addAddress,
  addContact,
  removePhone,
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
  .post(validate(createCompanySchema), asyncWrapper(storeCompany))
  .get(requireUser, asyncWrapper(getCompany))
  .put(
    validate(updateCompanySchema),
    requireUser,
    authorizeUser(['admin']),
    asyncWrapper(updateCompany)
  );

router
  .route('/add-address')
  .post(requireUser, authorizeUser(['admin']), asyncWrapper(addAddress));

router
  .route('/add-contact')
  .post(requireUser, authorizeUser(['admin']), asyncWrapper(addContact));

router
  .route('/remove-address/:addrId')
  .get(requireUser, authorizeUser(['admin']), asyncWrapper(removeAddress));

router
  .route('/remove-phone')
  .post(requireUser, authorizeUser(['admin']), asyncWrapper(removePhone));

export default router;
