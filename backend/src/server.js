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
db.sync()
    .then(() => {
        console.log("Banco conectado");
    })
    .catch((err) => {
        console.log("Erro no banco", err.message);
    });


// exporta para o Vercel
module.exports = app;