const jwt = require('jsonwebtoken');

async function authenticationMiddleware(req, res, next) {
  try {
    let { authorization } = req.headers;
    
    if (authorization && authorization.startsWith('Bearer ')) {
      authorization = authorization.substring('Bearer '.length);
    }

    if (!authorization && req.query) {
      authorization = req.query.token;
    }

    const { accountId, userId, backToUrl, shortLivedToken } = jwt.verify(
      authorization,
      process.env.MONDAY_CLIENT_SECRET
    );
    req.session = { accountId, userId, backToUrl, shortLivedToken };
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'not authenticated' });
  }
}

module.exports = {
  authenticationMiddleware,
};
