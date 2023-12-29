const rateLimit = require('express-rate-limit');

// Crie uma instância do middleware de rate limiting
const limiter = rateLimit({
    windowMs: 1000, // 1 segundo
    max: 10, // limite cada IP a 10 requisições por janela de 'windowMs'
    keyGenerator: (req /*, res*/) => {
        // Aqui, você pode extrair o token JWT do cabeçalho de autorização e usá-lo como chave
        return req.headers.authorization; // Assumindo que o token esteja no cabeçalho Authorization
    },
    handler: (req, res /*, next*/) => {
        res.status(429).json({ message: "Muitas requisições. Tente novamente mais tarde." });
    }
});

module.exports = limiter;