// Signup/SignupPage.jsx

"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/header";
import HeaderButton from "../../components/ui/HeaderButton";
import AuthHeader from "../../components/ui/AuthHeader";
import AuthCard from "../../components/ui/AuthCard";
import Footer from "../../components/ui/Footer";
import SignupForm from "./SignupForm";
import { signup } from "../../api/authAPI";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup({ email, password, username });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <>
      <Header
        rightButtons={
          <>
            <HeaderButton to="/">Home</HeaderButton>
            <HeaderButton to="/login">Login</HeaderButton>
          </>
        }
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative">
          <AuthHeader tagline="Start your fitness journey today!" />
          <AuthCard
            title="Create Account"
            description="Join thousands of users on their fitness journey"
            footerText="Already have an account?"
            footerLinkText="Sign in here"
            footerLinkTo="/login"
          >
            <SignupForm
              email={email}
              setEmail={setEmail}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleSubmit={handleSubmit}
            />
          </AuthCard>
          <Footer />
        </div>
      </div>
    </>
  );
}
