const mongoose = require('mongoose');

// const DB_CONNECTION_STRING = 'mongodb://localhost:27017/dadosbackend';
const DB_CONNECTION_STRING = 'mongodb+srv://joaoprado:Eletrica16!@cluster01.4f55ixx.mongodb.net/?retryWrites=true&w=majority'


const connectDB = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexão com o MongoDB estabelecida com sucesso.');
    } catch (err) {
        console.error('Falha ao conectar ao MongoDB', err);
        process.exit(1); // Sai do processo em caso de falha
    }
};

module.exports = connectDB;
