const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Server is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
