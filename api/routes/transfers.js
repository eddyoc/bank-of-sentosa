const express = require('express');
const transfersCtrl = require('@controllers/transfers');
const router = express.Router();

// => GET /transfers/my
// Get my transfers list
router.get('/my', transfersCtrl.getMyTransfers);

// => POST /transfers
// Make a transfer
router.post('/', transfersCtrl.create);

module.exports = router;
