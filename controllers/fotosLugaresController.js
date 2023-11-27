const FotoLugar = require('../models/fotoLugarModel');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

exports.adicionarFotoLugar = async (req, res) => {
    try {
        // Este middleware espera que o campo do arquivo no formulário seja nomeado como 'fotos'
        upload.array('fotos', 10)(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (req.files.length === 0) {
                return res.status(400).json({ message: "Nenhuma imagem fornecida" });
            }

            const fotos = req.files.map(file => ({
                data: file.buffer,
                contentType: file.mimetype
            }));

            const novaFotoLugar = new FotoLugar({
                lugarId: req.body.lugarId,
                fotos: fotos
            });

            await novaFotoLugar.save();
            res.status(201).json(novaFotoLugar);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
