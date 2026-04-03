const router = require('express').Router();
const { getDashboard, getMyProperties, updatePropertyStatus } = require('../controllers/ownerController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('owner', 'admin'));
router.get('/dashboard', getDashboard);
router.get('/properties', getMyProperties);
router.put('/properties/:id/status', updatePropertyStatus);

module.exports = router;
