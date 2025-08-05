import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { List, RefreshCw, Trash2, Utensils } from "lucide-react";
import { formatDate } from "./utils";

export default function MealPlanCard({
  plan,
  onDeletePlan,
  onRegeneratePlan,
  onGenerateGroceryList,
}) {
  let planData = plan.planData;

  // 🛡 Defensive parse if data is a string
  if (typeof planData === "string") {
    try {
      planData = JSON.parse(planData);
    } catch (err) {
      console.error("Invalid plan data JSON:", err);
      planData = null;
    }
  }

  const hasValidPlanData = Array.isArray(planData) && planData.length > 0;

  return (
    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <Utensils className="mr-2 h-5 w-5 text-purple-600" />
              3-Day Meal Plan
            </CardTitle>
            <CardDescription>
              Select the start date and preferred cuisines for your 3-day plan.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRegeneratePlan(plan.id)}
                disabled={plan.regenerationCount >= 2}
                className={`border-purple-200 text-purple-600 hover:bg-purple-50 ${
                  plan.regenerationCount >= 2 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              {plan.regenerationCount >= 2 && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  You can regenerate only 2 times
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeletePlan(plan.id)}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!hasValidPlanData ? (
          <p className="text-sm text-gray-500 italic">
            No valid meal plan data found. Please regenerate the plan.
          </p>
        ) : (
          planData.map((week, weekIdx) => (
            <div
              key={weekIdx}
              className="border border-purple-100 rounded-lg p-4 bg-purple-50/50"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Meal Plan (Starting {formatDate(plan.startDate)})
              </h3>

              {Array.isArray(week) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {week.map((day, dayIdx) => (
                    <Card
                      key={dayIdx}
                      className="border-0 bg-white/70 backdrop-blur-sm shadow-sm"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md font-semibold text-gray-800">
                          {day.dayOfWeek || `Day ${dayIdx + 1}`}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          Total Calories: {day.totalCalories}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {["breakfast", "lunch", "dinner"].map((mealType) => {
                          const meal = day.meals[mealType];
                          if (!meal) return null;

                          return (
                            <div
                              key={mealType}
                              className="border-t border-gray-100 pt-3"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-gray-700 capitalize">
                                  {mealType}
                                </h4>
                              </div>
                              <p className="text-sm text-gray-800 font-medium">
                                {meal.recipeName}
                              </p>
                              <p className="text-xs text-gray-600">
                                Cuisine: {meal.cuisine}
                              </p>
                              <p className="text-xs text-gray-600">
                                Calories: {meal.calories}
                              </p>
                              {meal.sides && meal.sides !== "None" && (
                                <p className="text-xs text-gray-600">
                                  Side: {meal.sides}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-red-500 italic">
                  Invalid week data format. Please regenerate the plan.
                </p>
              )}
            </div>
          ))
        )}

        {hasValidPlanData && (
          <div className="flex justify-end pt-4 border-t border-purple-100">
            <Button
              onClick={() => onGenerateGroceryList(plan.id)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              <List className="mr-2 h-4 w-4" />
              View Grocery List
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
