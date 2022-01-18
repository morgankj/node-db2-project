const Car = require('../cars/cars-model');
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params.id;
  try {
    const possibleCar = await Car.getById(id);
    if (possibleCar) {
      req.car = possibleCar;
      next();
    } else {
      next({ status: 404, message: `car with id ${id} is not found` });
    }
  } 
  catch (err) {
    next(err);
  }

}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || !mileage) {
    next({ status: 400, message: `<field name> is missing` });
  } else {
    next();
  }
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
  const { vin } = req.body;
  const possibleCar = await Car.getByVin(vin);
  if (possibleCar) {
    next({ status: 400, message: `vin ${vin} is invalid` });
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
