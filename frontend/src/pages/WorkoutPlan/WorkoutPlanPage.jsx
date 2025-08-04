// WorkoutPlans/WorkoutPlanPage.jsx
"use client";

import { useState, useEffect } from "react";
import WorkoutPlanHeader from "./WorkoutPlanHeader";
import WorkoutPlanFilters from "./WorkoutPlanFilters";
import WorkoutPlanSummary from "./WorkoutPlanSummary";
import AddPlanForm from "./AddPlanForm";
import WorkoutPlansList from "./WorkoutPlanList";
import { getDateForWeek, getWeekDateRange } from "./utils/dateUtils";
import {
  fetchWorkoutPlans,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} from "../../api/workouttAPI";

export default function WorkoutPlanPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [plans, setPlans] = useState([]);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newPlan, setNewPlan] = useState({
    dayOfWeek: "",
    focusArea: "",
    exercises: [""],
    totalDuration: "",
    date: "",
  });

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const date = getDateForWeek(selectedYear, selectedMonth, selectedWeek);
      const data = await fetchWorkoutPlans(date);
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans:", err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [selectedYear, selectedMonth, selectedWeek]);

  const handleAddExercise = () => {
    setNewPlan({
      ...newPlan,
      exercises: [...newPlan.exercises, ""],
    });
  };

  const handleRemoveExercise = (index) => {
    if (newPlan.exercises.length > 1) {
      setNewPlan({
        ...newPlan,
        exercises: newPlan.exercises.filter((_, i) => i !== index),
      });
    }
  };

  const handleExerciseChange = (index, value) => {
    const updatedExercises = newPlan.exercises.map((exercise, i) =>
      i === index ? value : exercise
    );
    setNewPlan({
      ...newPlan,
      exercises: updatedExercises,
    });
  };

  const handleSavePlan = async () => {
    try {
      const validExercises = newPlan.exercises.filter((ex) => ex.trim());
      if (!newPlan.dayOfWeek || !newPlan.focusArea || validExercises.length === 0) {
        alert("Please fill in all required fields");
        return;
      }

      const planData = {
        ...newPlan,
        exercises: validExercises,
        date: getDateForWeek(selectedYear, selectedMonth, selectedWeek),
      };

      await createWorkoutPlan(planData);
      setNewPlan({
        dayOfWeek: "",
        focusArea: "",
        exercises: [""],
        totalDuration: "",
        date: "",
      });
      setIsAddingPlan(false);
      fetchPlans();
    } catch (err) {
      console.error("Error saving plan:", err);
      alert(err.error || "Failed to save plan");
    }
  };

  const handleUpdatePlan = async () => {
    try {
      const validExercises = editingPlan.exercises.filter((ex) => ex.trim());
      await updateWorkoutPlan(editingPlan.id, {
        ...editingPlan,
        exercises: validExercises,
      });
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      console.error("Error updating plan:", err);
      alert(err.error || "Failed to update plan");
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      await deleteWorkoutPlan(planId);
      fetchPlans();
    } catch (err) {
      console.error("Error deleting plan:", err);
      alert(err.error || "Failed to delete plan");
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan({
      ...plan,
      exercises: [...plan.exercises],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <WorkoutPlanHeader />
      <main className="container mx-auto px-4 py-8">
        <WorkoutPlanFilters
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedWeek={selectedWeek}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedWeek={setSelectedWeek}
        />
        <WorkoutPlanSummary
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedWeek={selectedWeek}
          plans={plans}
        />
        <AddPlanForm
          isAddingPlan={isAddingPlan}
          setIsAddingPlan={setIsAddingPlan}
          newPlan={newPlan}
          setNewPlan={setNewPlan}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedWeek={selectedWeek}
          handleSavePlan={handleSavePlan}
          handleAddExercise={handleAddExercise}
          handleRemoveExercise={handleRemoveExercise}
          handleExerciseChange={handleExerciseChange}
        />
        <WorkoutPlansList
          plans={plans}
          editingPlan={editingPlan}
          setEditingPlan={setEditingPlan}
          handleEditPlan={handleEditPlan}
          handleUpdatePlan={handleUpdatePlan}
          handleDeletePlan={handleDeletePlan}
          loading={loading}
        />
      </main>
    </div>
  );
}