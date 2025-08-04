// Profile/ProfileView.jsx

import { Badge } from "../../components/ui/badge";
import { Calendar, Scale, Target, Trophy, User, Activity } from "lucide-react";
import { calculateAge, getSelectedGender, getSelectedGoal } from "./utils";

export default function ProfileView({ profile }) {
  const gender = getSelectedGender(profile.gender);
  const goal = getSelectedGoal(profile.goal);

  return (
    <div className="space-y-6">
      {/* Top Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{gender?.icon}</span>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-semibold text-gray-800">{profile.gender}</p>
            </div>
          </div>
        </div>

        {/* DOB + Age */}
        <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-pink-600" />
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-semibold text-gray-800">
                {new Date(profile.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-gray-500">
                Age: {calculateAge(profile.dateOfBirth)} years
              </p>
            </div>
          </div>
        </div>

        {/* Weight */}
        <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="h-6 w-6 text-cyan-600" />
            <div>
              <p className="text-sm text-gray-600">Weight</p>
              <p className="font-semibold text-gray-800">{profile.weight} kg</p>
            </div>
          </div>
        </div>

        {/* Goal */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{goal?.icon}</span>
            <div>
              <p className="text-sm text-gray-600">Fitness Goal</p>
              <p className="font-semibold text-gray-800">{profile.goal}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Allergies */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <User className="h-6 w-6 text-gray-600" />
          <div>
            <p className="text-sm text-gray-600">Food Allergies</p>
            <p className="font-semibold text-gray-800">{profile.foodAllergies || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Completion Badge */}
      <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-800">Profile Complete!</h3>
        </div>
        <p className="text-gray-600 mb-3">
          Great job! Your profile is set up and ready. You can now enjoy personalized workout plans and meals.
        </p>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            <Activity className="w-3 h-3 mr-1" />
            Profile Active
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Goal Set
          </Badge>
        </div>
      </div>
    </div>
  );
}
