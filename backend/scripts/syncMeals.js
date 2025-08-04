const sequelize = require('../config/db');
const Meal = require('../models/meal');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    // Create the table
    await Meal.sync({ force: true }); // WARNING: this deletes existing table
    console.log('meals table created');

    process.exit();
  } catch (error) {
    console.error('Sync error:', error);
    process.exit(1);
  }
})();
