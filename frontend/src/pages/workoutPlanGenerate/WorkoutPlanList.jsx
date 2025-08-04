// pages/workoutplanGenerate/WorkoutPlanList.jsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Calendar, Clock, Target, Trash2 } from "lucide-react";

export default function WorkoutPlanList({
  workoutPlans,
  loadingPlans,
  handleDeletePlan,
}) {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatPlanText = (planText) => {
    const lines = planText?.split("\n").filter((line) => line.trim()) || [];
    const sections = [];
    let currentWeek = null;
    let currentDay = null;
    let exercises = [];

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (/^Week\s*\d+:?/i.test(trimmed)) {
        if (currentDay && exercises.length) {
          currentDay.exercises = [...exercises];
          exercises = [];
        }
        if (currentDay) currentWeek?.days.push(currentDay);
        if (currentWeek) sections.push(currentWeek);
        currentWeek = {
          title: trimmed.replace(/\*/g, "").replace(/:/g, "").trim(),
          days: [],
        };
        currentDay = null;
      } else if (/^Day\s*\d+:?/i.test(trimmed)) {
        if (currentDay && exercises.length) {
          currentDay.exercises = [...exercises];
          currentWeek?.days.push(currentDay);
          exercises = [];
        }
        const dayMatch = trimmed.match(/^Day\s*(\d+):\s*(.+)?/i);
        currentDay = {
          dayNumber: dayMatch?.[1] || "1",
          title: dayMatch?.[2]?.trim() || "Unnamed",
          duration: null,
          exercises: [],
        };
      } else if (/^[+-]\s+/.test(trimmed)) {
        exercises.push(trimmed.replace(/^[+-]\s+/, ""));
      } else if (trimmed && !/^Here is|This is|I've created/i.test(trimmed)) {
        exercises.push(trimmed);
      }
    });

    if (currentDay && exercises.length) currentDay.exercises = exercises;
    if (currentDay) currentWeek?.days.push(currentDay);
    if (currentWeek) sections.push(currentWeek);

    return (
      <div className="space-y-6">
        {sections.map((week, i) => (
          <div key={i} className="border border-purple-200 rounded-xl p-6 bg-white/50">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {week.title}
            </h3>
            <div className="grid gap-4">
              {week.days.map((day, j) => (
                <div
                  key={j}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Target className="h-4 w-4 mr-2 text-purple-600" />
                      Day {day.dayNumber}: {day.title}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {day.exercises.map((exercise, k) => (
                      <div
                        key={k}
                        className="flex items-start gap-3 p-3 bg-white/70 rounded-md border border-purple-100"
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                        <p className="text-gray-700 text-sm leading-relaxed">{exercise}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loadingPlans) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading workout plans...</p>
        </CardContent>
      </Card>
    );
  }

  if (!workoutPlans.length) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No workout plans found</h3>
          <p className="text-gray-500">Start by generating your first AI-powered workout plan!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {workoutPlans.map((plan) => (
        <Card key={plan.id} className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <Target className="mr-2 h-5 w-5 text-purple-600" />
                  {plan.goal} Plan
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Generated on {formatDate(plan.generatedAt)}
                </CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    <Calendar className="w-3 h-3 mr-1" />
                    {plan.daysPerWeek} days/week
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {plan.weeks} weeks
                  </Badge>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                    <Clock className="w-3 h-3 mr-1" />
                    {plan.duration} min
                  </Badge>
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                    {plan.level}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeletePlan(plan.id)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              {formatPlanText(plan.planText)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
