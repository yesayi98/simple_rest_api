const express = require('express');
const {getTrades, createTrade, getTrade} = require("../controllers/trades");
const router = express.Router();

const validateRequest = (req, res, next) => {
    const { type, shares } = req.body;
    console.log(req.body);
    if (!['buy', 'sell'].includes(type)) {
        return res.status(400).json({ error: 'the type is invalid' });
    }

    const parsedShares = parseInt(shares); // Parse shares to an integer
    if (isNaN(parsedShares) || parsedShares < 0 || parsedShares > 100) {
        return res.status(400).json({ error: 'shares must be a valid number in range [0, 100]' });
    }
    next();
};

router.get('/', getTrades)
router.post('/',validateRequest, createTrade)
router.get('/:id', getTrade)

router.patch('/:id', (req, res) => res.status(405))
router.delete('/:id', (req, res) => res.status(405))
router.put('/:id', (req, res) => res.status(405))

module.exports = router;
