// WorkoutPlans/WorkoutPlansList.jsx

import { Card, CardContent } from "../../components/ui/card";
import EmptyState from "../../components/ui/EmptyState";
import WorkoutPlanCard from "./WorkoutPlanCard";
import { Calendar } from "lucide-react";

export default function WorkoutPlansList({
  plans,
  editingPlan,
  setEditingPlan,
  handleEditPlan,
  handleUpdatePlan,
  handleDeletePlan,
  loading,
}) {
  if (loading) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading plans...</p>
        </CardContent>
      </Card>
    );
  }

  if (plans.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No plans scheduled"
        subtitle="Start by adding your first workout plan for this week."
      />
    );
  }

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <WorkoutPlanCard
          key={plan.id}
          plan={plan}
          editingPlan={editingPlan}
          setEditingPlan={setEditingPlan}
          handleEditPlan={handleEditPlan}
          handleUpdatePlan={handleUpdatePlan}
          handleDeletePlan={handleDeletePlan}
        />
      ))}
    </div>
  );
}