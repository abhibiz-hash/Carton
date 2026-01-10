import { Router } from 'express';
import { createNote, getNotes, deleteNote, updateNote } from '../controllers/noteController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();


router.use(authenticateToken);

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;