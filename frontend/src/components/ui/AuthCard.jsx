import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

const AuthCard = ({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkTo
}) => {
  return (
    <Card className="border-0 bg-white/70 backdrop-blur-md shadow-xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
        {footerText && (
          <div className="text-center pt-4 border-t border-purple-100">
            <p className="text-gray-600">
              {footerText}{" "}
              <a href={footerLinkTo} className="text-purple-600 hover:text-purple-700 font-medium">
                {footerLinkText}
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthCard;
