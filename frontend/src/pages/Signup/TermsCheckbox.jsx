// Signup/TermsCheckbox.jsx

import { Link } from "react-router-dom";

export default function TermsCheckbox() {
  return (
    <div className="flex items-start space-x-2 pt-2">
      <input
        type="checkbox"
        id="terms"
        className="mt-1 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
        required
      />
      <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
        I agree to the{" "}
        <Link to="#" className="text-purple-600 hover:text-purple-700 font-medium">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="#" className="text-purple-600 hover:text-purple-700 font-medium">
          Privacy Policy
        </Link>
      </label>
    </div>
  );
}
