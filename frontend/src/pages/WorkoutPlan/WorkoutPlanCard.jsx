// WorkoutPlans/WorkoutPlanCard.jsx

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Clock, Edit3, Trash2, Plus, Save, X } from "lucide-react";

const daysOfWeek = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];


export default function WorkoutPlanCard({
  plan,
  editingPlan,
  setEditingPlan,
  handleEditPlan,
  handleUpdatePlan,
  handleDeletePlan,
}) {
  const isEditing = editingPlan?.id === plan.id;
  const [localError, setLocalError] = useState("");

  const handleLocalSave = () => {
    const validExercises = editingPlan.exercises.filter((ex) => ex.trim());
    if (!editingPlan.dayOfWeek || !editingPlan.focusArea || validExercises.length === 0) {
      setLocalError("All fields including at least one exercise are required.");
      return;
    }
    setLocalError("");
    handleUpdatePlan();
  };

  if (isEditing) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardContent className="p-6 space-y-4">
          {localError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {localError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Day of Week</Label>
              <select
                value={editingPlan.dayOfWeek}
                onChange={(e) => setEditingPlan({ ...editingPlan, dayOfWeek: e.target.value })}
                className="w-full h-10 px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 bg-white"
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Focus Area</Label>
              <Input
                value={editingPlan.focusArea}
                onChange={(e) => setEditingPlan({ ...editingPlan, focusArea: e.target.value })}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Exercises</Label>
            {editingPlan.exercises.map((exercise, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={exercise}
                  onChange={(e) => {
                    const updated = editingPlan.exercises.map((ex, i) =>
                      i === index ? e.target.value : ex
                    );
                    setEditingPlan({ ...editingPlan, exercises: updated });
                  }}
                  className="border-purple-200 focus:border-purple-400"
                />
                {editingPlan.exercises.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updated = editingPlan.exercises.filter((_, i) => i !== index);
                      setEditingPlan({ ...editingPlan, exercises: updated });
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setEditingPlan({
                  ...editingPlan,
                  exercises: [...editingPlan.exercises, ""],
                })
              }
              className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Total Duration</Label>
            <Input
              value={editingPlan.totalDuration || ""}
              onChange={(e) =>
                setEditingPlan({ ...editingPlan, totalDuration: e.target.value })
              }
              className="border-purple-200 focus:border-purple-400"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleLocalSave}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={() => setEditingPlan(null)} size="sm">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {plan.dayOfWeek}
              </Badge>
              <h3 className="text-lg font-semibold text-gray-800">{plan.focusArea}</h3>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Exercises:</h4>
              <div className="flex flex-wrap gap-2">
                {plan.exercises.map((exercise, index) => (
                  <Badge key={index} variant="outline" className="border-pink-200 text-pink-700">
                    {exercise}
                  </Badge>
                ))}
              </div>
            </div>

            {plan.totalDuration && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1 text-cyan-500" />
                <span>{plan.totalDuration}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditPlan(plan)}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeletePlan(plan.id)}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}