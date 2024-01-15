const Sugestao = require('../models/faleconoscoModel');


exports.adicionarSugestao = async (req, res) => {
    try {

        if (!req.body.nome || !req.body.email || !req.body.sugestao) {
            return res.status(400).json({ message: "É necessário os campos: nome, e-mail e sugestão" });
        }

        const novaSugestao = new Sugestao({
            nome: req.body.nome,
            email: req.body.email,
            sugestao: req.body.sugestao
        });

        await novaSugestao.save();
        res.status(201).json(novaSugestao);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};