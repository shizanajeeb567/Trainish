import { Dumbbell } from "lucide-react";

const Footer = ({ withLogo = false, withBackground = false }) => {
  return (
    <footer
      className={`w-full ${withBackground ? "py-8 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-100" : "mt-8"} `}
    >
      <div className={`${withLogo ? "container px-4 md:px-6 mx-auto" : "text-center"}`}>
        <div
          className={`${
            withLogo
              ? "flex flex-col sm:flex-row items-center justify-center gap-4"
              : "text-sm text-gray-500"
          }`}
        >
          {withLogo && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Trainish
              </span>
            </div>
          )}
          <p className="text-sm text-gray-600">
            © 2024 Trainish. Made with 💜 for fitness enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
