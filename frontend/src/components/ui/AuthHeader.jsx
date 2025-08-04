// components/ui/AuthHeader.jsx
import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

const AuthHeader = ({ tagline = "Start your fitness journey today!" }) => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-flex items-center justify-center mb-4 group">
        <div className="p-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl group-hover:shadow-lg transition-shadow">
          <Dumbbell className="h-6 w-6 text-white" />
        </div>
        <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Trainish
        </span>
      </Link>
      <p className="text-gray-600">{tagline}</p>
    </div>
  );
};

export default AuthHeader;
