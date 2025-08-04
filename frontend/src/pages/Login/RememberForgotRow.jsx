// Login/RememberForgotRow.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

export default function RememberForgotRow() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="accent-purple-500"
        />
        Remember me
      </label>
      <Link
        to="/forgot-password"
        className="text-sm text-purple-600 hover:underline font-medium"
      >
        Forgot password?
      </Link>
    </div>
  );
}
