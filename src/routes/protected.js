import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware para verificar o token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log("Token não fornecido");
    return res.redirect('/login');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token inválido ou expirado');
      return res.redirect('/login');
    }
    req.user = user;
    next();
  });
};

// Rota protegida (qualquer usuário autenticado)
router.get('/home', authenticateToken, (req, res) => {
  const homePath = path.resolve('src', 'home.html');
  res.sendFile(homePath);
});

export default router;
