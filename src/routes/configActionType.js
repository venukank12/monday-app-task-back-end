const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/ownAuth');
const getAllConfigActionTypeController = require('../controllers/configActionType/getAllActionType');

router.get('/config-action-type', authenticationMiddleware, getAllConfigActionTypeController);

module.exports = router;
