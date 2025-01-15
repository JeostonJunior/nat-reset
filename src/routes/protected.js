import express from 'express';
import path from 'path';
import { authenticateToken } from '../middleware/authenticate.js';

const router = express.Router();

// Middleware para autenticação
router.use(authenticateToken);

// Rotas protegidas
router.get('/home', (req, res) => {
  const homePath = path.resolve('public', 'home.html');
  res.sendFile(homePath);
});

export default router;
