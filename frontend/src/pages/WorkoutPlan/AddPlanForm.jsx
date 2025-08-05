// WorkoutPlans/AddPlanForm.jsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Plus, Clock, Save, X } from "lucide-react";
import PrimaryActionBar from "../../components/ui/PrimaryActionBar";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AddPlanForm({
  isAddingPlan,
  setIsAddingPlan,
  newPlan,
  setNewPlan,
  selectedMonth,
  selectedWeek,
  handleSavePlan,
  handleAddExercise,
  handleRemoveExercise,
  handleExerciseChange,
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!isAddingPlan) {
    return (
      <Card className="mb-6 border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <PrimaryActionBar
            label="Add New Workout Plan"
            icon={Plus}
            onClick={() => setIsAddingPlan(true)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-0 bg-white/70 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <Plus className="mr-2 h-5 w-5 text-purple-600" />
          Create New Workout Plan
        </CardTitle>
        <CardDescription>
            Add a workout plan for {months[selectedMonth]}, Week {selectedWeek}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dayOfWeek" className="text-sm font-medium text-gray-700">
              Day of Week *
            </Label>
            <select
              id="dayOfWeek"
              value={newPlan.dayOfWeek}
              onChange={(e) => setNewPlan({ ...newPlan, dayOfWeek: e.target.value })}
              className="w-full h-10 px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400 bg-white"
            >
              <option value="">Select Day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
  <Label htmlFor="focusArea" className="text-sm font-medium text-gray-700">
    Focus Area *
  </Label>
  <select
    id="focusArea"
    value={newPlan.focusArea}
    onChange={(e) => setNewPlan({ ...newPlan, focusArea: e.target.value })}
    className="w-full h-10 px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400 bg-white"
  >
    <option value="">Select Focus Area</option>
    <option value="Leg Day">Leg Day</option>
    <option value="Push Day">Push Day</option>
    <option value="Pull Day">Pull Day</option>
    <option value="Cardio">Cardio</option>
    <option value="Upper Body">Upper Body</option>
    <option value="Lower Body">Lower Body</option>
    <option value="Full Body">Full Body</option>
    <option value="Core & Abs">Core & Abs</option>
  </select>
</div>

        </div>

        {/* Exercises */}
        <div>
          <Label className="text-sm font-medium text-gray-700 flex items-center mb-2">
            <span className="mr-1">Exercises *</span>
          </Label>
          {newPlan.exercises.map((exercise, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                placeholder={`Exercise ${index + 1}`}
                value={exercise}
                onChange={(e) => handleExerciseChange(index, e.target.value)}
                className="border-purple-200 focus:border-purple-400"
              />
              {newPlan.exercises.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveExercise(index)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={handleAddExercise}
            className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>
        </div>

        {/* Duration */}
        <div>
          <Label htmlFor="totalDuration" className="text-sm font-medium text-gray-700 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Total Duration
          </Label>
          <Input
  id="totalDuration"
  placeholder="e.g., 45 minutes"
  value={newPlan.totalDuration}
  onChange={(e) => {
    const value = e.target.value;
    // Allow only if it ends in 'minutes' or 'mins'
    const isValid = /^\d+\s?(minutes|mins)$/i.test(value.trim());
    setNewPlan({
      ...newPlan,
      totalDuration: value,
      durationInvalid: value && !isValid,
    });
  }}
  className={`border-purple-200 focus:border-purple-400 ${
    newPlan.durationInvalid ? "border-red-400 focus:border-red-500" : ""
  }`}
/>
{newPlan.durationInvalid && (
  <p className="text-sm text-red-600 mt-1">Duration must be like "45 minutes" or "30 mins"</p>
)}

        </div>

        {/* Save / Cancel */}
        <div className="flex gap-3 pt-4 border-t border-purple-100">
          <Button
            onClick={handleSavePlan}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Plan
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsAddingPlan(false);
              setNewPlan({
                dayOfWeek: "",
                focusArea: "",
                exercises: [""],
                totalDuration: "",
                date: "",
              });
            }}
            className="border-gray-300"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
