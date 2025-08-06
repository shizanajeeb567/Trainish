import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Plus, Clock, Save, X } from "lucide-react";
import PrimaryActionBar from "../../components/ui/PrimaryActionBar";

const daysOfWeek = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];


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
  existingPlans
}) {
  const [exerciseErrors, setExerciseErrors] = useState([]);
  const [durationError, setDurationError] = useState("");
  const [dayError, setDayError] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
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

  const validateExercise = (value, index) => {
    const regex = /^[A-Za-z\s]{0,50}$/;
    const updatedErrors = [...exerciseErrors];
    if (!regex.test(value)) {
      updatedErrors[index] = "Only alphabets allowed, max 50 characters.";
    } else {
      updatedErrors[index] = "";
    }
    setExerciseErrors(updatedErrors);
    handleExerciseChange(index, value);
  };

  const validateDuration = (value) => {
    const num = Number(value);
    if (!/^\d+$/.test(value) || num < 1 || num > 120) {
      setDurationError("Duration must be a number between 1 and 120");
    } else {
      setDurationError("");
    }
    setNewPlan({ ...newPlan, totalDuration: value });
  };

  const checkDuplicateDay = (day) => {
    const isDuplicate = existingPlans.some(
      (plan) =>
        plan.dayOfWeek === day &&
        plan.month === selectedMonth &&
        plan.week === selectedWeek
    );
    if (isDuplicate) {
      setDayError(`Plan for ${day} already exists in this week.`);
    } else {
      setDayError("");
    }
    setNewPlan({ ...newPlan, dayOfWeek: day });
  };

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
              onChange={(e) => checkDuplicateDay(e.target.value)}
              className="w-full h-10 px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400 bg-white"
            >
              <option value="">Select Day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            {dayError && (
              <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {dayError}
              </div>
            )}
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

        <div>
          <Label className="text-sm font-medium text-gray-700 flex items-center mb-2">
            <span className="mr-1">Exercises *</span>
          </Label>
          {newPlan.exercises.map((exercise, index) => (
            <div key={index} className="flex flex-col gap-1 mb-2">
              <div className="flex gap-2">
                <Input
                  placeholder={`Exercise ${index + 1}`}
                  value={exercise}
                  onChange={(e) => validateExercise(e.target.value, index)}
                  className={`border-purple-200 focus:border-purple-400 ${
                    exerciseErrors[index] ? "border-red-400 focus:border-red-500" : ""
                  }`}
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
              {exerciseErrors[index] && (
                <div className="mt-1 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {exerciseErrors[index]}
                </div>
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

        <div>
          <Label htmlFor="totalDuration" className="text-sm font-medium text-gray-700 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Total Duration (minutes)
          </Label>
          <Input
            id="totalDuration"
            placeholder="e.g., 45"
            value={newPlan.totalDuration}
            onChange={(e) => validateDuration(e.target.value)}
            className={`border-purple-200 focus:border-purple-400 ${
              durationError ? "border-red-400 focus:border-red-500" : ""
            }`}
          />
          {durationError && (
            <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {durationError}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-purple-100">
          <Button
            onClick={handleSavePlan}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            disabled={dayError || durationError || exerciseErrors.some((err) => err)}
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