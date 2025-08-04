// components/ui/PageHero.jsx
import { Dumbbell } from "lucide-react";

const PageHero = ({ title, subtitle }) => {
  return (
    <div className="text-center pt-10 pb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl shadow-lg">
          <Dumbbell className="h-7 w-7 text-white" />
        </div>
        <span className="ml-4 text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </span>
      </div>
      <p className="text-xl text-gray-600 font-medium">{subtitle}</p>
    </div>
  );
};

export default PageHero;
