import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './src/routes/auth.js';
import protectedRoutes from './src/routes/protected.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware para analisar o corpo da requisição como JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/protected', protectedRoutes);

app.get('/', (req, res) => {
  res.redirect('/protected/home');
});

// Rota GET para servir o login.html
app.get('/login', (req, res) => {
  const loginPath = path.resolve('public', 'login.html');
  res.sendFile(loginPath); // Exibe a página de login
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/login`);
});
