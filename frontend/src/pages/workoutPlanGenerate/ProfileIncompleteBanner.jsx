import { Card, CardContent } from "../../components/ui/card";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileIncompleteBanner({ profileComplete }) {
  if (profileComplete) return null;

  return (
    <Card className="mb-6 border-0 bg-yellow-50/70 backdrop-blur-sm shadow-md">
      <CardContent className="p-6 flex items-start gap-4">
        <Info className="h-6 w-6 text-yellow-600 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Profile Incomplete!</h3>
          <p className="text-gray-600">
            Please complete your{" "}
            <Link to="/profile" className="text-yellow-700 underline font-medium">
              profile
            </Link>{" "}
            before generating a workout plan for accurate results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
