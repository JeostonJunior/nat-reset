import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Simula banco de dados com usuários e roles
const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123' },
  {
    id: 2,
    email: 'jeostonjunior.sinchi@natura.net',
    password: '123456',
  },
];

// Login e geração de token
router.post('/loginValidation', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  // Redirecionar o usuário com o token no cabeçalho ou cookie
  res.cookie('authToken', token, { httpOnly: true });
  res.redirect('/protected/home');
});


export default router;
