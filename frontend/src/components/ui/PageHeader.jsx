import { ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils"; // optional utility
import { Button } from "./button";

const PageHeader = ({
  title,
  subtitle,
  subsubtitle,
  icon: Icon,
  showBack = false,
  onBack = () => window.history.back(),
  className = ""
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center gap-4 mb-8", className)}>
      {showBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-gray-600 hover:text-purple-600"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go Back</span>
        </Button>
      )}

      {Icon && <Icon className="h-8 w-8 text-purple-600" />}

      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1">
          {title}
        </h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
        {subsubtitle && <p className="text-gray-800">{subsubtitle}</p>}
      </div>
    </div>
  );
};


export default PageHeader;