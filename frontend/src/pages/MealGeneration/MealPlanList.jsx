// MealGeneration/MealPlanList.jsx

import { Card, CardContent } from "../../components/ui/card";
import EmptyState from "../../components/ui/EmptyState";
import MealPlanCard from "./MealPlanCard";
import { Utensils } from "lucide-react";

export default function MealPlanList({
  mealPlans,
  loading,
  handleDeletePlan,
  handleRegeneratePlan,
  handleGenerateGroceryList,
}) {
  if (loading) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading meal plans...</p>
        </CardContent>
      </Card>
    );
  }

  if (mealPlans.length === 0) {
    return (
      <EmptyState
        icon={Utensils}
        title="No meal plans found"
        description="Start by generating your first personalized meal plan!"
      />
    );
  }

  return (
    <div className="space-y-6">
      {mealPlans.map((plan) => (
        <MealPlanCard
          key={plan.id}
          plan={plan}
          onDeletePlan={handleDeletePlan}
          onRegeneratePlan={handleRegeneratePlan}
          onGenerateGroceryList={handleGenerateGroceryList}
        />
      ))}
    </div>
  );
}
// plain?.planData?.map(())