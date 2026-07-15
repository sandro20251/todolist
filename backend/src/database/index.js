const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,      // 'railway'
  process.env.DB_USER,      // 'root'
  process.env.DB_PASSWORD,  // 'FnxLwgILrRbMGEZjlSAGsMenTirlwjXi'
  {
    host: process.env.DB_HOST, // 'kodama.proxy.rlwy.net'
    port: process.env.DB_PORT, // 43129
    dialect: 'mysql',
    logging: false, // para não poluir o terminal, se preferir
    dialectOptions: {
      connectTimeout: 60000 // Aumenta o tempo limite de conexão (muito útil em deploys)
    }
  }
);

module.exports = sequelize;