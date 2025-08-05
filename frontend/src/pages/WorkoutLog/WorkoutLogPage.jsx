// WorkoutLog/WorkoutLogPage.jsx

"use client";

import { useState, useEffect } from "react";
import Header from "../../components/ui/header";
import HeaderButton from "../../components/ui/HeaderButton";
import PageHeader from "../../components/ui/PageHeader";
import WorkoutLogSummary from "./WorkoutLogSummary";
import AddWorkoutForm from "./AddWorkoutForm";
import WorkoutLogList from "./WorkoutLogList";
import { Dumbbell, Calendar } from "lucide-react";
import BackButton from "../../components/ui/BackButton";

import {
  fetchWorkoutLogs,
  saveWorkoutLogs,
  updateWorkoutLog,
  deleteWorkoutLog,
} from "../../api/workoutLogAPI";

export default function WorkoutLogPage() {
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [newWorkouts, setNewWorkouts] = useState([
    { exerciseName: "", sets: "", reps: "", duration: "" },
  ]);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchWorkoutLogs(selectedDate);
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      }
    };
    loadLogs();
  }, [selectedDate]);

  const addWorkoutField = () => {
    setNewWorkouts([...newWorkouts, { exerciseName: "", sets: "", reps: "", duration: "" }]);
  };

  const removeWorkoutField = (index) => {
    if (newWorkouts.length > 1) {
      setNewWorkouts(newWorkouts.filter((_, i) => i !== index));
    }
  };

  const updateNewWorkout = (index, field, value) => {
    const updated = newWorkouts.map((workout, i) =>
      i === index ? { ...workout, [field]: value } : workout
    );
    setNewWorkouts(updated);
  };

  const handleSaveWorkouts = async () => {
    const validWorkouts = newWorkouts
      .filter((w) => w.exerciseName.trim())
      .map((w) => ({
        exerciseName: w.exerciseName.trim(),
        sets: w.sets ? parseInt(w.sets) : null,
        reps: w.reps ? parseInt(w.reps) : null,
        duration: w.duration || null,
        date: selectedDate,
      }));

    if (validWorkouts.length === 0) return;

    try {
      const newLogs = await saveWorkoutLogs(validWorkouts);
      setLogs([...logs, ...newLogs]);
      setNewWorkouts([{ exerciseName: "", sets: "", reps: "", duration: "" }]);
      setIsAddingWorkout(false);
    } catch (error) {
      console.error("Failed to save workouts:", error.response?.data || error.message);
    }
  };

  const handleEditLog = (log) => {
    setEditingLog({
      ...log,
      sets: log.sets?.toString() || "",
      reps: log.reps?.toString() || "",
      duration: log.duration || "",
    });
  };

  const handleUpdateLog = async () => {
    try {
      const updated = await updateWorkoutLog(editingLog.id, editingLog);
      const updatedLogs = logs.map((log) => (log.id === editingLog.id ? updated : log));
      setLogs(updatedLogs);
      setEditingLog(null);
    } catch (error) {
      console.error("Failed to update log:", error);
    }
  };

  const handleDeleteLog = async (logId) => {
    try {
      await deleteWorkoutLog(logId);
      setLogs(logs.filter((log) => log.id !== logId));
    } catch (error) {
      console.error("Failed to delete log:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4">
  <BackButton />
  <PageHeader
    icon={Dumbbell}
    title="Workout Log"
    subtitle="Track your daily exercises and progress"
    className="mb-0"
  />
</div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <label htmlFor="date" className="text-sm font-medium">
                Date:
              </label>
              <input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto border-purple-200 focus:border-purple-400 rounded-md px-2 py-1"
              />
            </div>
          </div>
        </div>

        <WorkoutLogSummary logs={logs} selectedDate={selectedDate} />

        <AddWorkoutForm
          isAddingWorkout={isAddingWorkout}
          setIsAddingWorkout={setIsAddingWorkout}
          newWorkouts={newWorkouts}
          setNewWorkouts={setNewWorkouts}
          addWorkoutField={addWorkoutField}
          removeWorkoutField={removeWorkoutField}
          updateNewWorkout={updateNewWorkout}
          handleSaveWorkouts={handleSaveWorkouts}
          selectedDate={selectedDate}
        />

        <WorkoutLogList
          logs={logs}
          editingLog={editingLog}
          setEditingLog={setEditingLog}
          handleEditLog={handleEditLog}
          handleUpdateLog={handleUpdateLog}
          handleDeleteLog={handleDeleteLog}
        />
      </main>
    </div>
  );
}
