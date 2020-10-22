const express = require('express');
const commonCtrl = require('@controllers/common');
const router = express.Router();

// => GET /common/countUsers
// Get users count
router.get('/countUsers', commonCtrl.countUsers);

module.exports = router;
