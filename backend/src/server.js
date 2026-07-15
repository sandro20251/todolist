const express = require('express');
const cors = require('cors');
const db = require('./database/index');

const app = express();

// middlewares
app.use(express.json());

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://todolist-two-gold-54.vercel.app'
    ],
    credentials: true
}));

// rotas
app.use('/', require('./routes/taskRoutes'));


// sincronizar banco
db.authenticate()
    .then(() => {
        console.log("Banco conectado");
    })
    .catch((err) => {
        console.log("Erro banco:", err.message);
    });
const PORT = process.env.PORT || 3000;

if (process.env.PORT || require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando com sucesso na porta ${PORT}`);
    });
}

// exporta para o Vercel
module.exports = app;

