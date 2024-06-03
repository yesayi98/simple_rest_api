const Trade = require('../models/trades');

module.exports = {
    getTrades: async (req, res) => {
        const { type, user_id } = req.query;
        console.log(req.query);
        try {
            // Build query object
            const query = {};
            if (type) query.type = type;
            if (user_id) query.user_id = userId;

            // Find transactions based on query parameters
            const trades = await Trade.findAll({
                where: query
            });

            res.json(trades);
        } catch (error) {
            console.error('Error finding transactions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    createTrade: async (req, res) => {
        try {
            const trade = await Trade.create({
                type: req.body.type,
                user_id: req.body.user_id,
                symbol: req.body.symbol,
                shares: req.body.shares,
                price: req.body.price,
                timestamp: req.body.timestamp,
            })
            return res.status(201).json(trade);
        }
        catch (error) {
            console.error('Error creating trade:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getTrade: async (req, res) => {
        const { id } = req.params;

        try {
            const trade = await Trade.findByPk(id);

            if (!trade) {
                return res.status(404).json("ID not found");
            }

            res.json(trade);
        } catch (error) {
            console.error('Error finding trade:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}