const express = require('express');
const accountsCtrl = require('@controllers/accounts');
const router = express.Router();

router.get('/my', accountsCtrl.getMyAccounts);

module.exports = router;
