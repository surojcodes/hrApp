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
  .patch(
    validate(updateCompanySchema),
    requireUser,
    authorizeUser(['admin']),
    asyncWrapper(updateCompany)
  );

router
  .route('/add-address')
  .patch(requireUser, authorizeUser(['admin']), asyncWrapper(addAddress));

router
  .route('/add-contact')
  .patch(requireUser, authorizeUser(['admin']), asyncWrapper(addContact));

router
  .route('/remove-contact')
  .patch(requireUser, authorizeUser(['admin']), asyncWrapper(removePhone));

router
  .route('/remove-address/:addrId')
  .patch(requireUser, authorizeUser(['admin']), asyncWrapper(removeAddress));

export default router;
