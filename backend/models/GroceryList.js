module.exports = (sequelize, DataTypes) => {
  const GroceryList = sequelize.define("GroceryList", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    mealPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ingredientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: "GroceryLists",
  });

  return GroceryList;
};
