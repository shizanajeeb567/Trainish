import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  bgGradient,
  iconGradient,
  underlineGradient,
  onClick,
  linkTo,
  size = "md",
}) => {
  const card = (
    <Card
      onClick={onClick}
      className={cn(
        "group border-0 transition-all duration-300 hover:shadow-xl hover:scale-105",
        bgGradient,
        onClick && "cursor-pointer"
      )}
    >
      <CardHeader className={cn(size === "lg" ? "pb-4" : "pb-3")}>
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow",
              iconGradient,
              size === "lg" && "p-3 rounded-2xl"
            )}
          >
            <Icon className={cn(size === "lg" ? "h-8 w-8" : "h-6 w-6", "text-white")} />
          </div>
          <div>
            <CardTitle className="text-lg text-gray-800 whitespace-nowrap">{title}</CardTitle>

            <div
              className={cn(
                size === "lg" ? "w-12 h-1 mt-2" : "w-10 h-0.5 mt-1",
                "rounded-full",
                underlineGradient
              )}
            ></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className={cn(size === "lg" ? "text-base" : "text-sm", "text-gray-600 leading-relaxed")}>
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );

  return linkTo ? <Link to={linkTo} className="block">{card}</Link> : card;
};

export default FeatureCard;
