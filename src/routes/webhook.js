const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/mondayAuth');
const duplicateActionController = require('../controllers/webhook/duplicateAction');

router.post('/webhook/on-changes', authenticationMiddleware, duplicateActionController);

module.exports = router;
