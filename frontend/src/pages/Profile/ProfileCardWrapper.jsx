// Profile/ProfileCardWrapper.jsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { User } from "lucide-react";

export default function ProfileCardWrapper({ children, isEditing, hasProfile }) {
  return (
    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <User className="mr-2 h-5 w-5 text-purple-600" />
          {isEditing
            ? hasProfile
              ? "Edit Profile"
              : "Create Profile"
            : "Profile Details"}
        </CardTitle>
        <CardDescription>
          {isEditing ? "Update your personal information" : "Your current profile information"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}
