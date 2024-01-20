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
        jwt.verify(token, secretKey);
        // Token é válido
        res.send({ valid: true });
    } catch (error) {
        // Tratamento específico de erros relacionados ao JWT
        if (error instanceof jwt.JsonWebTokenError) {
            // Logue uma mensagem genérica sem detalhes sensíveis
            console.error(' O TOKEN recebido é de oura chave, erro na verificação do JWT');
            return res.status(401).send({ valid: false, message: 'Token inválido' });
        }

        // Para outros erros, você pode querer logar mais detalhes ou tratar de forma diferente
        console.error('Erro desconhecido na verificação do token', error);
        return res.status(500).send({ message: 'Erro interno no servidor' });
    }
};

module.exports = {
    generateTokenController,
    validateTokenController
}