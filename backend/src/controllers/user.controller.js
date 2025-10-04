const { LoginSchema, UserRegistration } = require('../schemas/user.schema');
const UserService = require('../services/user.service');
const { verifyPassword, hashPassword } = require('../auth/authentication');
const { handleControllerError } = require('../utils/errorHandler');
const jwt = require('../auth/jwt');
const { setCookie } = require('../auth/cookieUtils');



async function createUser(req, res) {
  try {
    const { referralToken, ...validatedData } = UserRegistration.parse(req.body);

    validatedData.password = await hashPassword(validatedData.password);

    const newUser = await UserService.createUser(validatedData, referralToken);

    return res.status(201).json(newUser);

  } catch (error) {
    return handleControllerError(res, error, {
      'User already exists': 409
    });
  }
}

async function login(req, res) {
  try {
    const validatedData = LoginSchema.parse(req.body);

    const user = await UserService.getUserByEmail(validatedData.email);

    if (!user || !(await verifyPassword(validatedData.password, user.password))) {
      return res.status(401).json({ message: "Usuário não encontrado ou senha incorreta." });
    }

    const payload = { id: user.id, email: user.email };

    const refreshToken = setCookie(res, payload);

    await UserService.saveRefreshToken(user.id, refreshToken);


    return res.status(200).json({ message: 'Login realizado com sucesso!' });

  } catch (error) {
    return handleControllerError(res, error);
  }
}


async function getMe(req, res) {
  const id = req.user.id;

  try {
    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(user);

  } catch (error) {
    return handleControllerError(res, error, {
      'User not found': 404
    });
  }
}


async function refresh(req, res) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token ausente.' });
  }

  try {
    const decoded = jwt.verifyRefreshToken(refreshToken);

    const user = await UserService.getUserById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Token inválido ou revogado.' });
    }

    const payload = { id: user.id, email: user.email };
    setCookie(res, payload);

    return res.status(200).json({ message: 'Token atualizado com sucesso!' });

  } catch (error) {
    let message = 'Refresh token inválido ou expirado.';
    if (error.name === 'TokenExpiredError') {
      message = 'Refresh token expirado. Requer novo login.';
    }
    console.error("Erro no refresh:", error.message);
    return res.status(401).json({ message });
  }
}

async function logout(req, res) {
  res.clearCookie('accessToken', { httpOnly: true, secure: false, sameSite: 'strict' });
  res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'strict' });

  res.json({ message: 'Logout realizado com sucesso!' });
}


module.exports = {
  createUser,
  login,
  getMe,
  refresh,
  logout
};
