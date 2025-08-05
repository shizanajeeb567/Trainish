// pages/workoutplanGenerate/WorkoutPlanGeneratorPage.jsx

import Header from "../../components/ui/header";
import HeaderButton from "../../components/ui/HeaderButton";
import PageHeader from "../../components/ui/PageHeader";
import BackButton from "../../components/ui/BackButton";

import WorkoutPlanForm from "./WorkoutPlanForm";
import WorkoutPlanList from "./WorkoutPlanList";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import ProfileIncompleteBanner from "./ProfileIncompleteBanner";

import useWorkoutPlans from "./utils/useWorkoutPlans";
import { formatDate, formatPlanText } from "./utils/WorkoutPlanUtils.js";

import { Dumbbell, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export default function WorkoutPlanGeneratorPage() {
  const {
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
  } = useWorkoutPlans();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header
      />

      <main className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
  <BackButton />
  <div>
    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
      AI Workout Plans
    </h1>
    <p className="text-gray-600">Generate personalized workout plans powered by AI</p>
  </div>
</div>


        <ProfileIncompleteBanner profileComplete={profileComplete} />

        {!isGeneratingPlan && (
  <Card className="mb-6 border-0 bg-white/70 backdrop-blur-sm">
    <CardContent className="p-6">
      <Button
        onClick={() => {
          if (!profileComplete || workoutPlans.length > 0) return;
          setIsGeneratingPlan(true);
        }}
        disabled={!profileComplete || workoutPlans.length > 0}
        className={`w-full ${
          !profileComplete || workoutPlans.length > 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
        }`}
        title={
          !profileComplete
            ? "Please complete your profile first"
            : workoutPlans.length > 0
            ? "You already have a workout plan"
            : ""
        }
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Generate AI Workout Plan
      </Button>
    </CardContent>
  </Card>
)}

        {isGeneratingPlan && (
          <WorkoutPlanForm
            preferences={preferences}
            setPreferences={setPreferences}
            handleGeneratePlan={handleGeneratePlan}
            generatingPlan={generatingPlan}
            isGeneratingPlan={isGeneratingPlan}
            setIsGeneratingPlan={setIsGeneratingPlan}
            profileComplete={profileComplete}
            daysOptions={[
              { value: "2", label: "2 days per week" },
              { value: "3", label: "3 days per week" },
              { value: "4", label: "4 days per week" },
              { value: "5", label: "5 days per week" },
              { value: "6", label: "6 days per week" },
            ]}
            durationOptions={[
              { value: "30", label: "30 minutes" },
              { value: "45", label: "45 minutes" },
              { value: "60", label: "60 minutes" },
              { value: "75", label: "75 minutes" },
              { value: "90", label: "90 minutes" },
            ]}
            levelOptions={[
              { value: "Beginner", label: "Beginner", icon: "🌱", color: "from-green-400 to-green-600" },
              { value: "Intermediate", label: "Intermediate", icon: "💪", color: "from-yellow-400 to-yellow-600" },
              { value: "Advanced", label: "Advanced", icon: "🔥", color: "from-red-400 to-red-600" },
            ]}
          />
        )}

        <WorkoutPlanList
          workoutPlans={workoutPlans}
          loadingPlans={loadingPlans}
          formatDate={formatDate}
          formatPlanText={formatPlanText}
          handleDeletePlan={handleDeletePlan}
        />
      </main>

      <DeleteConfirmationDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}