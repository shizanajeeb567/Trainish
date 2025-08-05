// components/ui/BackButton.jsx
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";

export default function BackButton({ onClick, className = "" }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick || (() => window.history.back())}
      className={`text-gray-600 hover:text-purple-600 ${className}`}
    >
      <ArrowLeft className="h-6 w-6" />
      <span className="sr-only">Go Back</span>
    </Button>
  );
}
