import { Button } from "./button";
import { cn } from "../../lib/utils";

export default function PrimaryActionBar({ label, icon: Icon, onClick, className = "" }) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 flex items-center justify-center gap-2 shadow-md transition-all duration-300",
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </Button>
  );
}