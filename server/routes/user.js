import express from 'express';
import dotenv from 'dotenv';
import {
  handleLogin,
  handleSignUp,
  handleRefreshToken,
  getUserInfo,
  handleUserSearch,
} from '../controllers/user.js';
import { authenticateToken } from '../utils/middlewares.js';
import { upload } from '../utils/multer.middleware.js';

dotenv.config();

const router = express.Router();

// un-auth routes
router.post('/login', handleLogin);
router.post('/signup', upload.single('profileImage'), handleSignUp);

router.get('/profile', authenticateToken, getUserInfo);

router.get('/reAuthenticate', handleRefreshToken);

router.get('/search', authenticateToken, handleUserSearch);

export default router;
