// Profile/ProfileForm.jsx

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Save, X, Target, Scale, Calendar, User } from "lucide-react";
import { genderOptions, goalOptions } from "./utils";

export default function ProfileForm({
  formData,
  setFormData,
  saving,
  handleSave,
  handleCancel,
  hasProfile,
}) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* Gender Selection */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">Gender *</Label>
        <div className="grid grid-cols-3 gap-3">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, gender: option.value })}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                formData.gender === option.value
                  ? `border-purple-400 bg-gradient-to-r ${option.color} text-white shadow-lg`
                  : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-md"
              }`}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div
                className={`text-sm font-medium ${
                  formData.gender === option.value ? "text-white" : "text-gray-700"
                }`}
              >
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 flex items-center mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          Date of Birth *
        </Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          className="border-purple-200 focus:border-purple-400"
          max={today}
        />
      </div>

      {/* Weight + Height */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="weight" className="text-sm font-medium text-gray-700 flex items-center mb-2">
            <Scale className="h-4 w-4 mr-1" />
            Weight (kg) *
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="e.g., 52"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            className="border-purple-200 focus:border-purple-400"
            min="1"
            max="500"
          />
        </div>

        <div>
          <Label htmlFor="height" className="text-sm font-medium text-gray-700 flex items-center mb-2">
            <Target className="h-4 w-4 mr-1" />
            Height (cm or ft) *
          </Label>
          <Input
  id="height"
  type="text"
  placeholder="e.g., 5'8&quot; or 175cm"
  value={formData.height}
  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
  className="border-purple-200 focus:border-purple-400"
/>

        </div>
      </div>

      {/* Fitness Goal */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
          <Target className="h-4 w-4 mr-1" />
          Fitness Goal *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goalOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, goal: option.value })}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.goal === option.value
                  ? `border-purple-400 bg-gradient-to-r ${option.color} text-white shadow-lg`
                  : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{option.icon}</span>
                <span
                  className={`font-medium ${
                    formData.goal === option.value ? "text-white" : "text-gray-700"
                  }`}
                >
                  {option.value}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div>
        <Label htmlFor="foodAllergies" className="text-sm font-medium text-gray-700 flex items-center mb-2">
          <User className="h-4 w-4 mr-1" />
          Food Allergies (optional)
        </Label>
        <Input
          id="foodAllergies"
          type="text"
          placeholder="e.g., Dairy, Gluten or N/A"
          value={formData.foodAllergies}
          onChange={(e) => setFormData({ ...formData, foodAllergies: e.target.value })}
          className="border-purple-200 focus:border-purple-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4 border-t border-purple-100">
        <Button
          onClick={handleSave}
          disabled={
            saving ||
            !formData.gender ||
            !formData.dateOfBirth ||
            !formData.weight ||
            !formData.goal
          }
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {hasProfile ? "Update Profile" : "Create Profile"}
            </>
          )}
        </Button>

        {hasProfile && (
          <Button variant="outline" onClick={handleCancel} className="border-gray-300">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}
      </div>
    </>
  );
}
