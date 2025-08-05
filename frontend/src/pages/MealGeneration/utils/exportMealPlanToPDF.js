import jsPDF from "jspdf";

export function exportMealPlanToPDF(plan) {
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text(`Meal Plan (Start Date: ${plan.startDate})`, 10, y);
  y += 10;

  let planData = plan.planData;
  if (typeof planData === "string") {
    try {
      planData = JSON.parse(planData);
    } catch {
      doc.text("Invalid meal plan data.", 10, y);
      doc.save("meal_plan.pdf");
      return;
    }
  }

  if (!Array.isArray(planData)) {
    doc.text("Invalid meal plan format.", 10, y);
    doc.save("meal_plan.pdf");
    return;
  }

  planData.forEach((week, weekIdx) => {
    if (!Array.isArray(week)) return;

    week.forEach((day, dayIdx) => {
      y += 10;
      doc.setFontSize(14);
      doc.text(`${day.dayOfWeek || `Day ${dayIdx + 1}`}`, 10, y);
      y += 8;
      doc.setFontSize(11);
      doc.text(`Total Calories: ${day.totalCalories}`, 10, y);

      ["breakfast", "lunch", "dinner"].forEach((mealType) => {
        const meal = day.meals[mealType];
        if (!meal) return;
        y += 8;

        doc.setFont(undefined, "bold");
        doc.text(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)}:`, 10, y);
        doc.setFont(undefined, "normal");

        y += 6;
        doc.text(`Recipe: ${meal.recipeName}`, 12, y);
        y += 5;
        doc.text(`Cuisine: ${meal.cuisine} | Calories: ${meal.calories}`, 12, y);

        if (meal.sides && meal.sides !== "None") {
          y += 5;
          doc.text(`Side: ${meal.sides}`, 12, y);
        }

        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });

      y += 4;
    });
  });

  doc.save("meal_plan.pdf");
}
