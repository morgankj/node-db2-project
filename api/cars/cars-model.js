const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars');

}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('fruits').where('id', id).first();
}

const create = (car) => {
  // DO YOUR MAGIC
  const [id] = await db('car').insert(car);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create
}
