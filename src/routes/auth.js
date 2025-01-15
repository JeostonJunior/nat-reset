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

router.post('/loginValidation', (req, res) => {
  const { email, password } = req.body;
  console.log('validation');

  // Verifica se o usuário existe
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Gera o token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Retorna o token ao cliente
  res.json({ token });
});

export default router;
