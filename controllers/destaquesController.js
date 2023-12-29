const Destaque = require('../models/destaquesModel');
const multer = require('multer');

exports.adicionarDestaque = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Nenhuma imagem fornecida" });
        }

        const fotos = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }));

        const novaDestaque = new Destaque({
            lugarId: req.body.lugarId,
            fotos: fotos
        });

        await novaDestaque.save();
        res.status(201).json(novaDestaque);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.verificarFotos = async (req, res) => {
    try {
        const lugarId = req.params.lugarId;
        const fotos = await Destaque.find({ lugarId: lugarId });

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
        const fotos = await Destaque.find({ lugarId: lugarId });

        if (fotos) {
            res.status(200).json(fotos);
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
        await Destaque.deleteMany({ lugarId: lugarId });

        res.status(200).json({ message: "Lugar e suas fotos foram deletados com sucesso." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};