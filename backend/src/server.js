// const express = require('express');
// const cors = require('cors');
// const db = require('./database/index');

// const app = express();

// // middlewares
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.json({
//         status: "API funcionando",
//         ambiente: "Vercel"
//     });
// });

// app.use(cors({
//     origin: [
//         'http://localhost:3000',
//         'https://todolist-two-gold-54.vercel.app'
//     ],
//     credentials: true
// }));

// // rotas
// app.use('/', require('./routes/taskRoutes'));


// // sincronizar banco
// db.authenticate()
//     .then(() => {
//         console.log("Banco conectado");
//     })
//     .catch((err) => {
//         console.log("Erro banco:", err.message);
//     });


// // exporta para o Vercel
// module.exports = app;

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        status: "API funcionando"
    });
});

module.exports = app;