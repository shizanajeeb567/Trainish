// WorkoutPlans/WorkoutPlanSummary.jsx

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Calendar } from "lucide-react";
import { getWeekDateRange } from "./utils/dateUtils";

export default function WorkoutPlanSummary({ selectedYear, selectedMonth, selectedWeek, plans }) {
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

  return (
    <Card className="mb-6 border-0 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {months[selectedMonth]} {selectedYear} - Week {selectedWeek}
            </h2>
            <p className="text-gray-600 text-sm mb-1">
              {getWeekDateRange(selectedYear, selectedMonth, selectedWeek)}
            </p>
            <p className="text-purple-600 font-medium">
              {plans.length} {plans.length === 1 ? "Plan" : "Plans"} scheduled
            </p>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Calendar className="w-4 h-4 mr-1" />
            Active Period
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}