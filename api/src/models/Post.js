const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.TEXT
        },
        body: {
            type: Sequelize.TEXT
        },
    }, {
        timestamps: false
    });
};