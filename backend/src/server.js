// const express = require('express');
// const cors = require('cors');
// const db = require('./database/index');
// process.on('uncaughtException', (err) => {
//     console.error('UNCAUGHT EXCEPTION');
//     console.error(err);
// });

// process.on('unhandledRejection', (err) => {
//     console.error('UNHANDLED REJECTION');
//     console.error(err);
// });

// console.log("1 - iniciou");

// const express = require('express');
// console.log("2 - express");

// const cors = require('cors');
// console.log("3 - cors");

// const db = require('./database/index');
// console.log("4 - database");

// const taskRoutes = require('./routes/taskRoutes');
// console.log("5 - routes");


// const app = express();

// // middlewares
// app.use(express.json());

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

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION');
    console.error(err);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION');
    console.error(err);
});

console.log("1 - iniciou");

const express = require('express');
console.log("2 - express");

const cors = require('cors');
console.log("3 - cors");

const db = require('./database/index');
console.log("4 - database");

const taskRoutes = require('./routes/taskRoutes');
console.log("5 - routes");

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
app.use('/', taskRoutes);

// banco
db.authenticate()
    .then(() => {
        console.log("Banco conectado");
    })
    .catch((err) => {
        console.log("Erro banco:", err.message);
    });

module.exports = app;

