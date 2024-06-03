// Uncomment the code below to use Sequelize ORM
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Trade = sequelize.define('Trade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shares: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Trade;