// components/ui/HeaderButton.jsx
import { Button } from "./button";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const HeaderButton = ({ to, children, className = "" }) => {
  return (
    <Button
      size="sm"
      className={cn(
        "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg",
        className
      )}
      asChild
    >
      <Link to={to}>{children}</Link>
    </Button>
  );
};

export default HeaderButton;
