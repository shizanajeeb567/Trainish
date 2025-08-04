// pages/workoutplanGenerate/utils/useWorkoutPlans.js

import { useState, useEffect } from "react";
import {
  checkProfileStatus,
  fetchWorkoutPlans,
  generateWorkoutPlan,
  deleteWorkoutPlan,
} from "../../../api/workoutPlanAPI";

export default function useWorkoutPlans() {
  const [profileComplete, setProfileComplete] = useState(false);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  const [preferences, setPreferences] = useState({
    goal: "",
    daysPerWeek: "",
    durationWeeks: "",
    focusArea: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [planToDeleteId, setPlanToDeleteId] = useState(null);

  useEffect(() => {
    checkStatusAndPlans();
  }, []);

  const checkStatusAndPlans = async () => {
    try {
      const status = await checkProfileStatus();
      setProfileComplete(
        status.goal && status.gender && status.weight && status.height && status.dateOfBirth
      );
    } catch {
      setProfileComplete(false);
    }

    try {
      const plans = await fetchWorkoutPlans();
      setWorkoutPlans(plans);
    } catch {
      setWorkoutPlans([]);
    } finally {
      setLoadingPlans(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!profileComplete) {
      alert("Please complete your profile before generating a workout plan.");
      return;
    }

    setGeneratingPlan(true);
    try {
      await generateWorkoutPlan({
        userId: localStorage.getItem("userId"),
        preferences,
      });

      setIsGeneratingPlan(false);
      checkStatusAndPlans();
    } catch (err) {
      alert(err.error || "Failed to generate workout plan.");
    } finally {
      setGeneratingPlan(false);
    }
  };

  const handleDeletePlan = (id) => {
    setPlanToDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteWorkoutPlan(planToDeleteId);
      checkStatusAndPlans();
    } catch (err) {
      alert(err.error || "Failed to delete plan.");
    } finally {
      setShowDeleteConfirm(false);
      setPlanToDeleteId(null);
    }
  };

  return {
    profileComplete,
    workoutPlans,
    loadingPlans,
    handleGeneratePlan,
    handleDeletePlan,
    generatingPlan,
    isGeneratingPlan,
    preferences,
    setPreferences,
    setIsGeneratingPlan,
    showDeleteConfirm,
    setShowDeleteConfirm,
    confirmDelete,
  };
}
