// pages/workoutplanGenerate/WorkoutPlanForm.jsx

import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Calendar, Clock, Sparkles, Target } from "lucide-react";

export default function WorkoutPlanForm({
  preferences,
  setPreferences,
  handleGeneratePlan,
  generatingPlan,
  setIsGeneratingPlan,
  daysOptions,
  durationOptions,
  levelOptions,
  profileComplete,
}) {
  return (
    <div className="mb-6 border-0 bg-white/70 backdrop-blur-sm shadow-xl rounded-xl">
      <div className="p-6">
        <h2 className="text-xl text-gray-800 font-semibold flex items-center mb-4">
          <Target className="mr-2 h-5 w-5 text-purple-600" />
          Generate AI Workout Plan
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="days" className="text-sm font-medium text-gray-700 flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                Workout Days per Week *
              </Label>
              <Select
                value={preferences.days}
                onValueChange={(value) => setPreferences({ ...preferences, days: value })}
              >
                <SelectTrigger className="w-full h-10 border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  {daysOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration" className="text-sm font-medium text-gray-700 flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                Duration per Workout *
              </Label>
              <Select
                value={preferences.duration}
                onValueChange={(value) => setPreferences({ ...preferences, duration: value })}
              >
                <SelectTrigger className="w-full h-10 border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Fitness Level *
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {levelOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, level: option.value })}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    preferences.level === option.value
                      ? `border-purple-400 bg-gradient-to-r ${option.color} text-white shadow-lg`
                      : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{option.icon}</span>
                    <span
                      className={`font-medium ${
                        preferences.level === option.value ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="weeks" className="text-sm font-medium text-gray-700 flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              Number of Weeks (1–4) *
            </Label>
            <Select
              value={preferences.weeks}
              onValueChange={(value) => setPreferences({ ...preferences, weeks: value })}
            >
              <SelectTrigger className="w-full h-10 border-purple-200 focus:border-purple-400">
                <SelectValue placeholder="Select weeks" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 4 }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1} Week{i + 1 > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-purple-100">
            <Button
              onClick={handleGeneratePlan}
              disabled={generatingPlan || !preferences.days || !preferences.duration || !preferences.level || !preferences.weeks}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              {generatingPlan ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Plan
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsGeneratingPlan(false)}
              className="border-gray-300"
              disabled={generatingPlan}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
