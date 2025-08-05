// WorkoutLog/AddWorkoutForm.jsx

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import PrimaryActionBar from "../../components/ui/PrimaryActionBar";
import { Plus, Clock, Hash, Target, Save, X } from "lucide-react";

export default function AddWorkoutForm({
  isAddingWorkout,
  setIsAddingWorkout,
  newWorkouts,
  setNewWorkouts,
  addWorkoutField,
  removeWorkoutField,
  updateNewWorkout,
  handleSaveWorkouts,
  selectedDate,
}) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!isAddingWorkout) {
    return (
      <Card className="mb-6 border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <PrimaryActionBar
            label="Add New Workout"
            icon={Plus}
            onClick={() => setIsAddingWorkout(true)}
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
          Add New Workouts
        </CardTitle>
        <CardDescription>Add multiple exercises for {formatDate(selectedDate)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {newWorkouts.map((workout, index) => (
          <div key={index} className="p-4 border border-purple-100 rounded-lg bg-purple-50/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800">Exercise {index + 1}</h4>
              {newWorkouts.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeWorkoutField(index)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Exercise Name *</Label>
                <Input
                  placeholder="e.g., Push-ups"
                  value={workout.exerciseName}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    updateNewWorkout(index, "exerciseName", value);
                  }}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Hash className="h-4 w-4 mr-1" />
                  Sets
                </Label>
                <Input
                  type="number"
                  placeholder="3"
                  value={workout.sets}
                  min={1}
                  max={10}
                  onChange={(e) => {
                    const value = Math.min(10, Math.max(1, parseInt(e.target.value) || 1));
                    updateNewWorkout(index, "sets", value);
                  }}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  Reps
                </Label>
                <Input
                  type="number"
                  placeholder="15"
                  value={workout.reps}
                  min={1}
                  max={40}
                  onChange={(e) => {
                    const value = Math.min(40, Math.max(1, parseInt(e.target.value) || 1));
                    updateNewWorkout(index, "reps", value);
                  }}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Duration
                </Label>
                <Input
                  type="number"
                  placeholder="30"
                  value={workout.duration}
                  min={1}
                  max={300}
                  onChange={(e) => {
                    const value = Math.min(300, Math.max(1, parseInt(e.target.value) || 1));
                    updateNewWorkout(index, "duration", value);
                  }}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={addWorkoutField}
            className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Exercise
          </Button>
        </div>

        <div className="flex gap-3 pt-4 border-t border-purple-100">
          <Button
            onClick={handleSaveWorkouts}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Workouts
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsAddingWorkout(false);
              setNewWorkouts([{ exerciseName: "", sets: "", reps: "", duration: "" }]);
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
