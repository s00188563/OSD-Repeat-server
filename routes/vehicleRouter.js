const router = require('express').Router();
const vehicleController = require('../controllers/vehicleController');

router
  .route('/vehicles')
  .get(vehicleController.getVehicle)
  .post(vehicleController.createVehicle);

router
  .route('/vehicles/:id')
  .delete(vehicleController.deleteVehicle)
  .put(vehicleController.updateVehicle);

module.exports = router;
