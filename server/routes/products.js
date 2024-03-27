import express from 'express';
import { authenticateToken } from '../utils/middlewares.js';
import { addProducts, getAllProducts } from '../controllers/products.js';
import { upload } from '../utils/multer.middleware.js';

const router = express.Router();

router.use(authenticateToken);

router
  .route('/')
  .get(getAllProducts)
  .post(upload.single('avatar'), addProducts);

export default router;
