import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Auth');
  if (!token) {
    console.log('Token não fornecido');
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
