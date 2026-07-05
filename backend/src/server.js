const express = require('express');
const cors = require('cors');
const db = require('./database/index');
const Task = require('./models/Task');
// definições iniciais
const PORTA = 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// rotas
app.use('/', require('./routes/taskRoutes'));
// escuta de porta
const iniciarServidor = async () => {
    try {
        await db.sync()

        app.listen(PORTA, () => {
            console.log(`O express está escutando a porta ${PORTA}`)
        })

    } catch (err) {
        console.log(err.message)
    }
}

iniciarServidor();
