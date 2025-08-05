import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Utensils, Plus, X } from "lucide-react";

const CUISINE_OPTIONS = [
  "Pakistani", "Italian", "Chinese", "Mexican", "Indian", "Thai", "American", "Keto"
];

export default function MealPlanForm({
  isCreating,
  setIsCreating,
  startDate,
  setStartDate,
  handleCreatePlan,
  generating,
  profileComplete,
  mealPlans
}) {
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const toggleCuisine = (cuisine) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  if (!isCreating) {
    return (
      <Card className="mb-6 border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
         <Button
  onClick={() => {
    if (!profileComplete || mealPlans.length > 0) return;
    setIsCreating(true);
  }}
  disabled={!profileComplete || mealPlans.length > 0}
  className={`flex items-center gap-2 ${
    !profileComplete || mealPlans.length > 0
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
  }`}
  title={
    !profileComplete
      ? "Please complete your profile first"
      : mealPlans.length > 0
      ? "You already have a meal plan"
      : ""
  }
>
  <Plus className="h-4 w-4" />
  Generate New Meal Plan
</Button>


        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-0 bg-white/70 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <Utensils className="mr-2 h-5 w-5 text-purple-600" />
          Generate New Meal Plan
        </CardTitle>
        <CardDescription>
          Select the start date and your preferred cuisines.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
              Start Date *
            </Label>
           <Input
  id="startDate"
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  min={new Date().toISOString().split("T")[0]}
  className="border-purple-200 focus:border-purple-400"
  required
/>

          </div>

          <div>
            
          </div>
        </div>

        {/* Cuisines */}
        <div>
          <Label className="text-sm font-medium text-gray-700">Preferred Cuisines (Optional)</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {CUISINE_OPTIONS.map((cuisine) => (
              <button
                key={cuisine}
                type="button"
                onClick={() => toggleCuisine(cuisine)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  selectedCuisines.includes(cuisine)
                    ? "bg-purple-100 text-purple-700 border-purple-300"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-purple-100">
          <Button
            onClick={() => handleCreatePlan(selectedCuisines)}
            disabled={generating || !startDate}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Generate Plan
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsCreating(false)}
            className="border-gray-300"
            disabled={generating}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
