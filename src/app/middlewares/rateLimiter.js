const rateLimit = require('express-rate-limit');

module.exports = rateLimiterUsingThirdParty = rateLimit({
  windowMs: 60 * 1000, // 24 hrs in milliseconds
  max: 10,
  message: 'You have exceeded requests!', 
  headers: true,
});