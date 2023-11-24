const multer = require('multer');

// Configuração para armazenamento em memória
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Filtro para aceitar apenas certos tipos de arquivos, por exemplo, imagens
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Não é um tipo de arquivo de imagem!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
