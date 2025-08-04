// components/ui/header.jsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dumbbell, UserCircle, Settings, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

const Header = ({ rightButtons = null, className = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenOnRoutes = ["/", "/login", "/signup"];
  const showProfile = !hiddenOnRoutes.includes(location.pathname);
  const logoClickable = !hiddenOnRoutes.includes(location.pathname);

  const handleOptionClick = (option) => {
    setDropdownOpen(false);
    if (option === "settings") navigate("/profile");
    else if (option === "logout") navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "px-4 lg:px-6 h-16 flex items-center border-b bg-white/70 backdrop-blur-md sticky top-0 z-50",
        className
      )}
    >
      {/* Logo → Conditionally clickable */}
      {logoClickable ? (
        <Link to="/dashboard" className="flex items-center justify-center">
          <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Trainish
          </span>
        </Link>
      ) : (
        <div className="flex items-center justify-center cursor-default">
          <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Trainish
          </span>
        </div>
      )}

      {/* Right Buttons & Profile */}
      <nav className="ml-auto flex gap-3 items-center">
        {rightButtons}

        {showProfile && (
          <div className="relative" ref={dropdownRef}>
            <button
  onClick={() => setDropdownOpen((prev) => !prev)}
  className="flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium text-purple-700 bg-white group"
>
  <div className="p-2 rounded-full transition-all group-hover:bg-gradient-to-r group-hover:from-pink-100 group-hover:to-purple-200">
    <UserCircle className="h-9 w-10" />
  </div>
</button>


            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-50">
                <button
                  onClick={() => handleOptionClick("settings")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => handleOptionClick("logout")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
