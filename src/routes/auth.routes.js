import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET_KEY = 'Lesaa2025KeySecureMouse';

// Simulación de usuario (idealmente vendría de tu base de datos)
const FAKE_USER = {
  username: 'usuario123',
  password: '123456', // ¡Nunca lo guardes en texto plano en producción!
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validar credenciales
  if (username !== FAKE_USER.username || password !== FAKE_USER.password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Crear token válido por 3 años
  const token = jwt.sign(
    { sub: username },
    SECRET_KEY,
    { expiresIn: '1095d' } // 3 años en días
  );

  res.json({ token });
});

export default router;
