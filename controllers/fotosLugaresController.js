const FotoLugar = require('../models/fotoLugarModel');
const sharp = require('sharp');
const multer = require('multer');

exports.adicionarFotoLugar = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.verificarFotos = async (req, res) => {
    try {
        const lugarId = req.params.lugarId;
        const fotos = await FotoLugar.find({ lugarId: lugarId });

        if (fotos.length > 0) {
            res.status(200).json({ message: "Fotos encontradas", fotos: fotos });
        } else {
            res.status(404).json({ message: "Nenhuma foto encontrada para este lugar" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.obterFotosPorLugar = async (req, res) => {
    try {
        const lugarId = req.params.lugarId;
        const fotos = await FotoLugar.find({ lugarId: lugarId });

        if (fotos) {
            res.status(200).json(fotos);
        } else {
            res.status(404).json({ message: "Nenhuma foto encontrada para este lugar" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.obterPrimeiraFotoPorLugar = async (req, res) => {
    try {
        const lugarId = req.params.lugarId;
        const fotos = await FotoLugar.findOne({ lugarId: lugarId });

        if (fotos && fotos.fotos.length > 0) {
            // Redimensionar e comprimir a primeira imagem
            sharp(fotos.fotos[0].data)
                .resize(300) // Redimensiona para uma largura de 200px, mantendo a proporção
                .jpeg({ quality: 80 }) // Converte para JPEG com 80% de qualidade
                .toBuffer()
                .then(compressedImage => {
                    res.status(200).contentType('image/jpeg').send(compressedImage);
                })
                .catch(err => {
                    console.error('Erro ao processar a imagem:', err);
                    res.status(500).json({ message: "Erro ao processar a imagem", error: err });
                });
        } else {
            res.status(404).json({ message: "Nenhuma foto encontrada para este lugar" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletarLugarEFotos = async (req, res) => {
    try {
        const lugarId = req.params.lugarId;

        // Primeiro, deletar todas as fotos associadas a esse LugarId
        await FotoLugar.deleteMany({ lugarId: lugarId });

        res.status(200).json({ message: "Lugar e suas fotos foram deletados com sucesso." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
