import { Link, useNavigate } from "react-router-dom"
import Footer from "../../components/ui/Footer";
import FeatureCard from "../../components/ui/FeatureCard";
import PageHero from "../../components/ui/PageHero";
import Header from "../../components/ui/header";
import HeaderButton from "../../components/ui/HeaderButton";
import FeatureSection from "../../components/ui/FeatureSection";
import {
  Dumbbell,
  Calendar,
  ChefHat,
  Target,
  ShoppingCart,
  TrendingUp,
  MessageCircle,
} from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
       <Header
      />

      {/* Logo Section */}
      <PageHero
  title="Trainish"
  subtitle="Your Fitness Command Center - Everything at Your Fingertips! 🚀"
/>

      {/* Features Section */}
          <FeatureSection
  gradient="from-purple-600 to-pink-600"
  headingSize="text-3xl sm:text-4xl"
  paragraphSize="text-lg"
  padding="py-12"
/>


         {/* Feature Cards Grid */}
<div className="max-w-7xl mx-auto px-4">
  {/* First Row - 4 wider cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

    <FeatureCard
      icon={Calendar}
      title="Weekly Planning"
      description="Plan your entire week with smart scheduling that adapts to your lifestyle and preferences."
      bgGradient="bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100"
      iconGradient="bg-gradient-to-r from-purple-400 to-indigo-500"
      underlineGradient="bg-gradient-to-r from-purple-400 to-indigo-400"
      onClick={() => navigate("/workout-plan")}
    />

    <FeatureCard
      icon={Dumbbell}
      title="Daily Workout Logs"
      description="Effortlessly track every workout with our intuitive interface. Log exercises, sets, and reps."
      bgGradient="bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100"
      iconGradient="bg-gradient-to-r from-pink-400 to-rose-500"
      underlineGradient="bg-gradient-to-r from-pink-400 to-rose-400"
      onClick={() => navigate("/workout-log")}
    />

    <FeatureCard
      icon={ChefHat}
      title="Personalized Meals"
      description="Receive customized weekly meal plans that consider your dietary preferences and fitness goals."
      bgGradient="bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100"
      iconGradient="bg-gradient-to-r from-cyan-400 to-blue-500"
      underlineGradient="bg-gradient-to-r from-cyan-400 to-blue-400"
      onClick={() => navigate("/meal-generation")}
    />

    <FeatureCard
      icon={ShoppingCart}
      title="Smart Grocery Lists"
      description="Automatically generate organized grocery lists based on your weekly meal plans."
      bgGradient="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100"
      iconGradient="bg-gradient-to-r from-amber-400 to-orange-500"
      underlineGradient="bg-gradient-to-r from-amber-400 to-orange-400"
      linkTo="/grocery-list"
    />
  </div>

  {/* Second Row - 2 cards wider and centered */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

    <FeatureCard
      icon={Target}
      title="Smart Workouts"
      description="Get AI-powered workout recommendations that evolve with your progress and fitness level."
      bgGradient="bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100"
      iconGradient="bg-gradient-to-r from-emerald-400 to-teal-500"
      underlineGradient="bg-gradient-to-r from-emerald-400 to-teal-400"
      linkTo="/smart-workouts"
    />

    <FeatureCard
      icon={MessageCircle}
      title="AI Fitness Chatbot"
      description="Get instant answers to your fitness questions with personalized advice 24/7."
      bgGradient="bg-gradient-to-br from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100"
      iconGradient="bg-gradient-to-r from-slate-400 to-gray-500"
      underlineGradient="bg-gradient-to-r from-slate-400 to-gray-400"
      linkTo="/chatbot"
    />

  </div>
</div>


           {/* Footer */}
      <Footer withLogo={true} withBackground={true} />
    </div>
  )
}
