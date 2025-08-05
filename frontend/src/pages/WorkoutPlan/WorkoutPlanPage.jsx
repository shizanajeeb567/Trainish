// WorkoutPlans/WorkoutPlanPage.jsx
"use client";

import { useState, useEffect } from "react";
import WorkoutPlanHeader from "./WorkoutPlanHeader";
import WorkoutPlanFilters from "./WorkoutPlanFilters";
import AddPlanForm from "./AddPlanForm";
import WorkoutPlansList from "./WorkoutPlanList";
import { getDateForWeek, getWeekDateRange } from "./utils/dateUtils";
import BackButton from "../../components/ui/BackButton";


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
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deletingPlanId, setDeletingPlanId] = useState(null);

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
        setErrorMessage("Please fill in all required fields.");
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
      setErrorMessage("");
      fetchPlans();
    } catch (err) {
      console.error("Error saving plan:", err);
      setErrorMessage(err?.error || "Failed to save plan.");
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
      setErrorMessage("");
      fetchPlans();
    } catch (err) {
      console.error("Error updating plan:", err);
      setErrorMessage(err?.error || "Failed to update plan.");
    }
  };

  const handleDeletePlan = async () => {
    try {
      await deleteWorkoutPlan(deletingPlanId);
      setShowConfirmDelete(false);
      setDeletingPlanId(null);
      setErrorMessage("");
      fetchPlans();
    } catch (err) {
      console.error("Error deleting plan:", err);
      setErrorMessage(err?.error || "Failed to delete plan.");
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan({
      ...plan,
      exercises: [...plan.exercises],
    });
  };

  const promptDeletePlan = (planId) => {
    setShowConfirmDelete(true);
    setDeletingPlanId(planId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <WorkoutPlanHeader />
      <main className="container mx-auto px-4 py-8">
  <div className="flex items-center gap-4 mb-4">
    <BackButton />
    <h1 className="text-2xl font-semibold text-gray-800">Workout Plans</h1>
  </div>


        {errorMessage && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {showConfirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Confirm Deletion</h2>
              <p className="text-sm text-gray-600 mb-5">Are you sure you want to delete this workout plan?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePlan}
                  className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <WorkoutPlanFilters
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedWeek={selectedWeek}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedWeek={setSelectedWeek}
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
          existingPlans={plans}
        />
        <WorkoutPlansList
          plans={plans}
          editingPlan={editingPlan}
          setEditingPlan={setEditingPlan}
          handleEditPlan={handleEditPlan}
          handleUpdatePlan={handleUpdatePlan}
          handleDeletePlan={promptDeletePlan}
          loading={loading}
        />
      </main>
    </div>
  );
}
