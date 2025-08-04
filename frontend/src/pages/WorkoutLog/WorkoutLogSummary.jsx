// WorkoutLog/WorkoutLogSummary.jsx

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function WorkoutLogSummary({ logs, selectedDate }) {
  const getDayName = (date) => {
    return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="mb-6 border-0 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{formatDate(selectedDate)}</h2>
            <p className="text-purple-600 font-medium">{getDayName(selectedDate)}</p>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {logs.length} {logs.length === 1 ? "Exercise" : "Exercises"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
