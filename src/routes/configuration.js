const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/ownAuth');
const addOrUpdateConfigController = require('../controllers/configuration/addOrUpdateConfig');
const getConfigController = require('../controllers/configuration/getConfig');

router.get('/config', authenticationMiddleware, getConfigController);
router.post('/config/add-or-update', authenticationMiddleware, addOrUpdateConfigController);

module.exports = router;
