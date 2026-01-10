import { Router } from 'express';
import { getMe, updateMe } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/me', getMe);

router.put('/me', updateMe);

export default router;