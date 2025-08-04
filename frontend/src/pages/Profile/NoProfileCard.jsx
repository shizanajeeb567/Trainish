// Profile/NoProfileCard.jsx

import { Button } from "../../components/ui/button";
import { User, UserCircle } from "lucide-react";

export default function NoProfileCard({ setIsEditing }) {
  return (
    <div className="text-center py-8">
      <UserCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">No Profile Found</h3>
      <p className="text-gray-500 mb-4">
        Create your profile to get started with personalized fitness tracking.
      </p>
      <Button
        onClick={() => setIsEditing(true)}
        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
      >
        <User className="mr-2 h-4 w-4" />
        Create Profile
      </Button>
    </div>
  );
}
