const mongoose = require('mongoose');

const fotoSchema = new mongoose.Schema({
    lugarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lugar'
    },
    foto: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('FotoLugar', fotoSchema);
