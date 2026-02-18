const crypto = require('crypto');

// Simple in-memory store for idempotency keys
// In production, use Redis or similar
const idempotencyStore = new Map();

// Clean up old entries every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [key, timestamp] of idempotencyStore.entries()) {
    if (timestamp < oneHourAgo) {
      idempotencyStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

const idempotencyMiddleware = (req, res, next) => {
  // Skip for GET requests
  if (req.method === 'GET') {
    return next();
  }

  // Generate or use idempotency key
  let idempotencyKey = req.headers['idempotency-key'];
  
  if (!idempotencyKey) {
    // Generate a key from request body for automatic idempotency
    const data = JSON.stringify(req.body) + req.path;
    idempotencyKey = crypto.createHash('sha256').update(data).digest('hex');
  }

  // Check if this request was already processed
  if (idempotencyStore.has(idempotencyKey)) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate request detected',
      error: 'This expense appears to be a duplicate. Please wait a moment and try again.'
    });
  }

  // Store the key
  idempotencyStore.set(idempotencyKey, Date.now());

  // Add the key to request for controller use
  req.idempotencyKey = idempotencyKey;

  // Clean up on response finish
  res.on('finish', () => {
    // If response wasn't successful, remove the key
    if (res.statusCode >= 400) {
      idempotencyStore.delete(idempotencyKey);
    }
  });

  next();
};

module.exports = idempotencyMiddleware;