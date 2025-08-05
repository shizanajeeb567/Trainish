// Signup/PasswordInput.jsx

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ value, onChange, showPassword, setShowPassword }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Create a strong password"
          className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400 pr-12"
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      <p className="text-xs text-gray-500">Password should be at least 8 characters long and should contain 1 special character at least.</p>
    </div>
  );
}
