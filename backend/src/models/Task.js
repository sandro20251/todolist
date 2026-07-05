const { DataTypes } = require('sequelize');
const db = require('../database/index');

const Task = db.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false }
})

module.exports = Task;