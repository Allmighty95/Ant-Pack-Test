const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.TEXT
        },
        city: {
            type: Sequelize.TEXT
        },
        company: {
            type: Sequelize.TEXT
        },
        avatar: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps: false
    });
};