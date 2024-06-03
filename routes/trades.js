const express = require('express');
const {getTrades, createTrade, getTrade} = require("../controllers/trades");
const router = express.Router();

const validateRequest = (req, res, next) => {
    const { type, shares } = req.body;
    if (!['buy', 'sell'].includes(type)) {
        return res.status(400).json({ error: 'the type is invalid' });
    }

    const parsedShares = parseInt(shares); // Parse shares to an integer
    if (isNaN(parsedShares) || parsedShares <= 0 || parsedShares >= 100) {
        return res.status(400).json({ error: 'shares must be a valid number in range [0, 100]' });
    }
    next();
};

const forbidMethods = (req, res, next) => {
    const { method } = req;
    if (method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    next();
};

router.use('/:id', forbidMethods);

router.get('/', getTrades)
router.post('/',validateRequest, createTrade)
router.get('/:id', getTrade)

module.exports = router;
