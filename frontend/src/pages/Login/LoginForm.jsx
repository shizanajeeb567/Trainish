// Login/LoginForm.jsx

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import PasswordInput from "./PasswordInput";
import RememberForgotRow from "./RememberForgotRow";
import axios from "axios";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  navigate,
  loading,
  setLoading,
})
 {
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // start loading
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.error || "Login failed");
  } finally {
    setLoading(false); // stop loading if error
  }
};


  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-purple-200 focus:border-purple-400"
          required
        />
      </div>

      {/* Password (show/hide) */}
      <PasswordInput
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      {/* Remember me + Forgot */}
      <RememberForgotRow />

      <Button
  type="submit"
  disabled={loading}
  className={`w-full text-white ${
    loading
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
  }`}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
      Signing In...
    </div>
  ) : (
    "Sign In"
  )}
</Button>

    </form>
  );
}
