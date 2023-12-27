const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Pegue o token do cabeçalho da requisição
  const token = req.headers['authorization'];

  // Verifique se o token foi fornecido
  if (!token) {
    console.log("Não tem TOKEN, ação barrada")
    return res.status(403).send('Acesso negado. Nenhum token fornecido.');
  }

  try {
    // Verifique se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Prossiga para a próxima middleware/route handler
  } catch (error) {
    // Se o token não for válido, retorne um erro
    res.status(400).send('Token inválido.');
  }
};

module.exports = {
  verificarToken
};