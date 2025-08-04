// WorkoutLog/WorkoutLogList.jsx

import WorkoutLogCard from "./WorkoutLogCard";
import { Card, CardContent } from "../../components/ui/card";
import EmptyState from "../../components/ui/EmptyState";
import { Dumbbell } from "lucide-react";

export default function WorkoutLogList({
  logs,
  editingLog,
  setEditingLog,
  handleEditLog,
  handleUpdateLog,
  handleDeleteLog,
}) {
  if (logs.length === 0) {
    return (
      <EmptyState
        icon={Dumbbell}
        title="No workouts logged"
        description="Start by adding your first workout for this day."
      />
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <WorkoutLogCard
          key={log.id}
          log={log}
          editingLog={editingLog}
          setEditingLog={setEditingLog}
          handleEditLog={handleEditLog}
          handleUpdateLog={handleUpdateLog}
          handleDeleteLog={handleDeleteLog}
        />
      ))}
    </div>
  );
}
