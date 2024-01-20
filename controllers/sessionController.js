const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY; // Use uma chave secreta segura

const generateTokenController = (req, res) => {

    // Defina as opções do token, como tempo de expiração
    const options = { expiresIn: '1h' };

    try {
        // Gera o token
        const token = jwt.sign({}, secretKey, options);

        res.json({ token: token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao gerar o token JWT' });
    }
};

const validateTokenController = (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }

    try {
        // Decodifica e verifica o token
        const decoded = jwt.verify(token, secretKey);
        res.send({ valid: true, decoded });
    } catch (error) {
        console.error(error);
        // Se o token é inválido ou expirou
        res.status(401).send({ valid: false, message: 'Token inválido ou expirado' });
    }
};

module.exports = {
    generateTokenController,
    validateTokenController
}