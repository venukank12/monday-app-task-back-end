const router = require('express').Router();
const mondayRoutes = require('./monday');
const configActionTypeRoutes = require('./configActionType');
const configRoutes = require('./configuration');
const webhookRoutes = require('./webhook');

router.use(mondayRoutes);
router.use(configActionTypeRoutes);
router.use(configRoutes);
router.use(webhookRoutes);

router.get('/', function (req, res) {
  res.json(getHealth());
});

router.get('/health', function (req, res) {
  res.json(getHealth());
  res.end();
});

const getHealth = () => ({
  ok: true,
  message: 'Healthy',
});

module.exports = router;
