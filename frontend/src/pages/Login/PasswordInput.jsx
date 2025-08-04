// Login/PasswordInput.jsx

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ password, setPassword, showPassword, setShowPassword }) {
  return (
    <div className="space-y-2 relative">
      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
        Password
      </Label>
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-purple-200 focus:border-purple-400 pr-10"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-[36px] text-purple-600 hover:text-purple-800"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}
