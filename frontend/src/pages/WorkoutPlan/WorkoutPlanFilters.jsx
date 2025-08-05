// WorkoutPlans/WorkoutPlanFilters.jsx

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Filter } from "lucide-react";
import { getWeekDateRange } from "./utils/dateUtils";

export default function WorkoutPlanFilters({
  selectedYear,
  selectedMonth,
  selectedWeek,
  setSelectedYear,
  setSelectedMonth,
  setSelectedWeek,
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

  const weeks = [1, 2, 3, 4, 5];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  return (
    <Card className="mb-6 border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <Filter className="mr-2 h-5 w-5 text-purple-600" />
          Select Time Period
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Month */}
          <div>
            <Label htmlFor="month" className="text-sm font-medium text-gray-700">
              Month
            </Label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full h-10 px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400 bg-white"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Week */}
          <div>
            <Label htmlFor="week" className="text-sm font-medium text-gray-700">
              Week
            </Label>
            <select
              id="week"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              className="w-full h-10 px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400 bg-white"
            >
              {weeks.map((week) => (
                <option key={week} value={week}>
                  Week {week} ({getWeekDateRange(selectedYear, selectedMonth, week)})
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
