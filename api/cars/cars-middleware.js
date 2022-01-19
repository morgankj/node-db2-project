const Car = require('../cars/cars-model');
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const possibleCar = await Car.getById(req.params.id);
    if (possibleCar) {
      req.car = possibleCar;
      next();
    } else {
      next({ status: 404, message: `car with id ${req.params.id} is not found` });
    }
  } 
  catch (err) {
    next(err);
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    next({ status: 400, message: `vin is missing` });
  }
  if (!make) {
    next({ status: 400, message: `make is missing` });
  }
  if (!model) {
    next({ status: 400, message: `model is missing` });
  }
  if (!mileage) {
    next({ status: 400, message: `mileage is missing` });
  }
  next();
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next();
  } else {
    next({ status: 400, message: `vin ${vin} is invalid` });
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const possibleCar = await Car.getByVin(req.body.vin);
  if (possibleCar) {
    next({ status: 400, message: `vin ${req.body.vin} already exists` });
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
