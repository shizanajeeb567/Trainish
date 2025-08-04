require("dotenv").config();
const Meal = require("../models/meal");
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const sequelize = require("../config/db"); // Make sure DB is connected

const populateMeals = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established");

    const csvPath = path.join(__dirname, "../data/meals.csv");
    const csvData = fs.readFileSync(csvPath);
    const parsedMeals = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    for (const meal of parsedMeals) {
      await Meal.create({
        recipeName: meal["Recipe Name"],
        ingredients: meal["Ingredients"],
        cuisine: meal["Cuisine"],
        mealType: meal["Meal Type"],
        calories: parseInt(meal["Calories"]),
        macros: meal["Macros"],
        sides: meal["Sides"] || "None",
      });
    }

    console.log("Meals table populated successfully!");
  } catch (err) {
    console.error("Error populating meals:", err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

populateMeals();
