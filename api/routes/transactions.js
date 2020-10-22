const express = require('express');
const transactionsCtrl = require('@controllers/transactions');
const router = express.Router();

// => GET /transactions/my
// Get my transfers list
router.get('/my', transactionsCtrl.getMyTransactions);

module.exports = router;
