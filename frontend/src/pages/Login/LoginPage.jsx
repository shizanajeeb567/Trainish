// Login/LoginPage.jsx

"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/ui/header"
import HeaderButton from "../../components/ui/HeaderButton"
import Footer from "../../components/ui/Footer"
import AuthHeader from "../../components/ui/AuthHeader"
import AuthCard from "../../components/ui/AuthCard"
import LoginForm from "./LoginForm"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <Header
        rightButtons={
          <>
            <HeaderButton to="/">Home</HeaderButton>
            <HeaderButton to="/signup">Sign Up</HeaderButton>
          </>
        }
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        {/* Blur decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative">
          <AuthHeader tagline="Welcome back to your fitness journey!" />

          <AuthCard
            title="Sign In"
            description="Enter your credentials to access your account"
            footerText="Don't have an account?"
            footerLinkText="Sign up here"
            footerLinkTo="/signup"
          >
            <LoginForm
  email={email}
  setEmail={setEmail}
  password={password}
  setPassword={setPassword}
  showPassword={showPassword}
  setShowPassword={setShowPassword}
  navigate={navigate}
  loading={loading}
  setLoading={setLoading}
/>

          </AuthCard>

          <Footer />
        </div>
      </div>
    </>
  )
}
