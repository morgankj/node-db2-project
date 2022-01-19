// DO YOUR MAGIC
const router = require("express").Router();
const Car = require("./cars-model");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("../cars/cars-middleware");

router.get('/', (req, res, next) => {
    Car.getAll()
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(next);
});

router.get('/:id', checkCarId, (req, res, next) => {
    Car.getById(req.params.id)
        .then(car => {
            res.json(car);
        })
        .catch(next);
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Car.create(req.body)
        .then(car => {
            res.json(car);
        })
        .catch(next);
});

module.exports = router;
