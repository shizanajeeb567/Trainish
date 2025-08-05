// Signup/SignupForm.jsx

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ArrowRight, User } from "lucide-react";
import PasswordInput from "./PasswordInput";
import TermsCheckbox from "./TermsCheckbox";

export default function SignupForm({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleSubmit,
  loading
})
 {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </Label>
        <div className="relative">
          <Input
            id="username"
            type="text"
            placeholder="Choose a username"
            className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400 pl-12"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
        />
      </div>

      {/* Password */}
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      {/* Terms */}
      <TermsCheckbox />

      {/* Submit */}
     <Button
  type="submit"
  disabled={loading}
  className={`w-full h-12 text-white shadow-lg transition-all duration-300 transform ${
    loading
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:scale-105"
  }`}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
      Creating...
    </div>
  ) : (
    <>
      Create Account
      <ArrowRight className="ml-2 h-5 w-5" />
    </>
  )}
</Button>

    </form>
  );
}
