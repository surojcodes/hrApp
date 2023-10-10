import express from 'express';
import {
  createCompany,
  updateCompany,
} from '../controllers/company.controller';
import requireUser from '../middleware/requireUser';
import authorizeUser from '../middleware/authorizeUser';

const router = express.Router();

router
  .route('/')
  .get(requireUser, authorizeUser(['admin']), createCompany)
  .put(requireUser, authorizeUser(['admin']), updateCompany);

export default router;
