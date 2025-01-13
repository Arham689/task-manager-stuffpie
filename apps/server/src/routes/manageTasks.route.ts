import express, { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/manageTask.contorller';
import { authenticateToken } from '../middleware/auth.middleware';

const router : Router = express.Router();

router.get('/tasks', authenticateToken ,  getTasks);
router.post('/tasks',authenticateToken, createTask);
router.put('/tasks/:taskId',authenticateToken , updateTask);
router.delete('/tasks/:taskId', authenticateToken , deleteTask);

export default router;