const FotoLugar = require('../models/fotoLugarModel');

exports.adicionarFotoLugar = async (req, res) => {
    try {
        // Neste caso, é necessário um middleware como `multer` para lidar com o upload de arquivos
        if (!req.file) {
            return res.status(400).json({ message: "Nenhuma imagem fornecida" });
        }

        const novaFoto = new FotoLugar({
            lugarId: req.body.lugarId,
            foto: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        await novaFoto.save();
        res.status(201).json(novaFoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
