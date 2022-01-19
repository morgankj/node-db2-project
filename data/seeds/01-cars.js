// STRETCH
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: "1J4AA2D18AL109140",
          make: "Toyota",
          model: "Corolla",
          mileage: 13500,
          title: "TITLE TEXT 1",
          transmission: "manual",
        },
        {
          vin: "5FRYD4H41EB065095",
          make: "Volvo",
          model: "Camry",
          mileage: 12,
          transmission: "automatic",
        },
        {
          vin: "1VWAP7A36EC087441",
          make: "Chevy",
          model: "Explorer",
          mileage: 111111,
          title: "TITLE TEXT 3",
        },
      ]);
    });
};
