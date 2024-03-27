import express from 'express';
import {
  deletePostById,
  getAllPosts,
  addPost,
  updatePostById,
} from '../controllers/posts.js';
import { authenticateToken } from '../utils/middlewares.js';

const router = express.Router();

router.use(authenticateToken);

router.route('/').get(getAllPosts).post(addPost);

router.route('/:id').get(deletePostById).put(updatePostById);

export default router;
