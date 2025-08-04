// components/ui/FeatureSection.jsx
import { Badge } from "./badge";
import { cn } from "../../lib/utils";

const FeatureSection = ({
  id = "features",
  title = "EVERYTHING YOU NEED IN ONE APP",
  subtitle = "Discover powerful tools designed to make your fitness journey enjoyable, sustainable, and completely personalized to your needs.",
  badgeText = "✨ Amazing Features",
  gradient = "from-purple-600 to-pink-600",
  padding = "py-16 md:py-24 lg:py-32",
  headingSize = "text-3xl sm:text-5xl",
  paragraphSize = "text-lg md:text-xl"
}) => {
  return (
    <section id={id} className={cn("w-full", padding)}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 px-4 py-2"
          >
            {badgeText}
          </Badge>
          <h2
            className={cn(
              "font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent",
              gradient,
              headingSize
            )}
          >
            {title}
          </h2>
          <p className={cn("max-w-[800px] text-gray-600 leading-relaxed", paragraphSize)}>{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
