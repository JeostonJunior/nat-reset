import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import authRoutes from './src/routes/auth';
import protectedRoutes from './src/routes/protected';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware para analisar o corpo da requisição como JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware de autenticação para a rota padrão
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.log('Token não fornecido');
    return res.redirect('/login');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token inválido ou expirado');
      return res.redirect('/login');
    }
    req.user = user; // Anexa os dados do usuário ao req para uso posterior
    next();
  });
};

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/protected', protectedRoutes);

// Rota padrão '/'
app.get('/', authenticateToken, (req, res) => {
  const homePath = path.resolve('src', 'home.html');
  res.sendFile(homePath); // Exibe a página home
});

// Rota GET para servir o login.html
app.get('/login', (req, res) => {
  const loginPath = path.resolve('src', 'login.html');
  res.sendFile(loginPath); // Exibe a página de login
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// app.post('/loginValidation', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ error: 'Email inválido.' });
//   }

//   const fakeUser = {
//     email: 'jeostonjunior@gmail.com',
//     password: '123456',
//   };

//   if (email === fakeUser.email && password === fakeUser.password) {
//     res.redirect('/home');
//     return res.status(401).json({ error: 'Credenciais inválidas.' });
//   }
//   console.log("Deu merda na validação");
// });


