// MealGeneration/MealGenerationPage.jsx

"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/header";
import HeaderButton from "../../components/ui/HeaderButton";
import PageHeader from "../../components/ui/PageHeader";
import ProfileIncompleteBanner from "./ProfileIncompleteBanner";
import MealPlanForm from "./MealPlanForm";
import MealPlanList from "./MealPlanList";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import ConfirmRegenerateDialog from "./ConfirmRegenerateDialog";
import {
  checkProfileStatus as checkProfileStatusAPI,
  fetchMealPlans,
  createMealPlan,
  regenerateMealPlan,
  deleteMealPlan,
  generateGroceryList,
} from "../../api/mealPlanAPI";
import { Utensils } from "lucide-react";

import { formatDate, getWeekDateRange } from "./utils";
import * as mealAPI from "../../api/mealPlanAPI";
console.log("mealAPI:", mealAPI);

export default function MealGenerationPage() {
  const navigate = useNavigate();

  const [profileComplete, setProfileComplete] = useState(false);
  const [mealPlans, setMealPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const [isCreatingNewPlan, setIsCreatingNewPlan] = useState(false);
  const [newPlanWeeks, setNewPlanWeeks] = useState("");
 const [newPlanStartDate, setNewPlanStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [savingMeal, setSavingMeal] = useState(false);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);
  const [planToRegenerateId, setPlanToRegenerateId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [planToDeleteId, setPlanToDeleteId] = useState(null);


  useEffect(() => {
    checkProfileStatus();
    fetchMealPlansHandler();
  }, []);

  const checkProfileStatus = async () => {
    try {
      const profile = await checkProfileStatusAPI();
      const isComplete =
        profile.goal && profile.gender && profile.dateOfBirth && profile.weight && profile.height;
      setProfileComplete(isComplete);
    } catch {
      setProfileComplete(false);
    }
  };

  const fetchMealPlansHandler = async () => {
    setLoadingPlans(true);
    try {
      const data = await fetchMealPlans();
      setMealPlans(data);
    } catch {
      setMealPlans([]);
    } finally {
      setLoadingPlans(false);
    }
  };

 const handleCreatePlan = async (cuisines) => {
  if (!profileComplete) {
    alert("Please complete your profile before generating a meal plan.");
    return;
  }

  setGeneratingPlan(true);
  try {
    await createMealPlan({
      startDate: newPlanStartDate,
      cuisines,
      weeks: 1, // fixed to 1 week only
    });
    setIsCreatingNewPlan(false);
    fetchMealPlansHandler();
  } catch (error) {
    alert(error.error || "Failed to generate meal plan.");
  } finally {
    setGeneratingPlan(false);
  }
};



  


  const handleDeletePlan = (planId) => {
    setPlanToDeleteId(planId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMealPlan(planToDeleteId);
      fetchMealPlansHandler();
    } catch (error) {
      alert(error.error || "Failed to delete meal plan.");
    } finally {
      setShowDeleteConfirm(false);
      setPlanToDeleteId(null);
    }
  };

  const handleRegeneratePlan = async (planId) => {
  if (!profileComplete) {
    alert("Please complete your profile before regenerating a meal plan.");
    return;
  }

  const plan = mealPlans.find((plan) => plan.id === planId);
  if (!plan) {
    alert("Meal plan not found.");
    return;
  }

  if (plan.regenerationCount >= 2) {
    return;
  }


  setPlanToRegenerateId(planId);
  setShowRegenerateConfirm(true);
};


  const confirmRegenerate = async () => {
    setGeneratingPlan(true);
    try {
      await regenerateMealPlan(planToRegenerateId);
      fetchMealPlansHandler();
    } catch (error) {
      alert(error.error || "Failed to regenerate meal plan.");
    } finally {
      setGeneratingPlan(false);
      setShowRegenerateConfirm(false);
      setPlanToRegenerateId(null);
    }
  };

  const handleGenerateGroceryList = async (planId) => {
    try {
      await generateGroceryList(planId);
      navigate(`/grocery-list?mealPlanId=${planId}`);
    } catch (error) {
      alert(error.error || "Failed to generate grocery list.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header
      />

      <main className="container mx-auto px-4 py-8">
        <PageHeader
          icon={Utensils}
          title="Meal Plans"
          subtitle="Generate and manage your personalized meal plans"
          extraInfo="Make sure your profile is complete beforehand for accurate results"
        />

        <ProfileIncompleteBanner profileComplete={profileComplete} />

        <MealPlanForm
  isCreating={isCreatingNewPlan}
  setIsCreating={setIsCreatingNewPlan}
  startDate={newPlanStartDate}
  setStartDate={setNewPlanStartDate}
  handleCreatePlan={handleCreatePlan}
  generating={generatingPlan}
  profileComplete={profileComplete}
  mealPlans={mealPlans} 
/>


        <MealPlanList
          mealPlans={mealPlans}
          loading={loadingPlans}
          handleDeletePlan={handleDeletePlan}
          handleRegeneratePlan={handleRegeneratePlan}
          handleGenerateGroceryList={handleGenerateGroceryList}
        />
      </main>

      <ConfirmRegenerateDialog
        open={showRegenerateConfirm}
        onClose={() => setShowRegenerateConfirm(false)}
        onConfirm={confirmRegenerate}
        loading={generatingPlan}
      />

      <ConfirmDeleteDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}