import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import Footer from "../../components/ui/Footer";
import FeatureSection from "../../components/ui/FeatureSection";
import FeatureCard from "../../components/ui/FeatureCard";
import {
  Dumbbell,
  Calendar,
  ChefHat,
  Target,
  ArrowRight,
  Sparkles,
  ShoppingCart,
  TrendingUp,
  MessageCircle,
} from "lucide-react"
import Header from "../../components/ui/header";
import HeaderButton from "../../components/ui/HeaderButton";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
       {/* Header */}
      <Header
  rightButtons={
    <>
      <HeaderButton to="/login">Login</HeaderButton>
      <HeaderButton to="/signup">Sign Up</HeaderButton>
    </>
  }
/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative mx-auto">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl">
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="w-fit bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-purple-200 px-4 py-2"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Your Personal Fitness Journey Starts Here
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl/none">
                    Meet{" "}
                    <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Trainish
                    </span>
                    <br />
                    Your Fitness Companion
                  </h1>
                  <p className="max-w-[700px] mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
                    Transform your body, elevate your mind, and unlock your potential with the most intuitive fitness
                    app that grows with you! 🚀
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    asChild
                  >
                    <Link to="/signup">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
            <FeatureSection
  gradient="from-purple-500 via-pink-500 to-red-500"
  headingSize="text-3xl sm:text-5xl"
  paragraphSize="text-lg md:text-xl"
  padding="py-16 md:py-24 lg:py-32"
/>


            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
  <FeatureCard
    icon={Dumbbell}
    title="Weekly Planning"
    description="Plan your entire week with smart scheduling that adapts to your lifestyle. Never miss a workout with intelligent planning."
    bgGradient="bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100"
    iconGradient="bg-gradient-to-r from-pink-400 to-rose-500"
    underlineGradient="bg-gradient-to-r from-pink-400 to-rose-400"
    size="lg"
  />

  <FeatureCard
    icon={Calendar}
    title="Daily Workout Logs"
    description="Effortlessly track every workout with our beautiful, intuitive interface. Log exercises, sets, reps, and weights while watching your progress unfold over time."
    bgGradient="bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100"
    iconGradient="bg-gradient-to-r from-purple-400 to-indigo-500"
    underlineGradient="bg-gradient-to-r from-purple-400 to-indigo-400"
    size="lg"
  />

  <FeatureCard
    icon={ChefHat}
    title="Personalized Meals"
    description="Receive customized weekly meal plans that consider your dietary preferences, allergies, and fitness goals. Eating healthy has never been easier!"
    bgGradient="bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100"
    iconGradient="bg-gradient-to-r from-cyan-400 to-blue-500"
    underlineGradient="bg-gradient-to-r from-cyan-400 to-blue-400"
    size="lg"
  />

  <FeatureCard
    icon={ShoppingCart}
    title="Smart Grocery Lists"
    description="Automatically generate organized grocery lists based on your weekly meal plans. Never forget an ingredient again with smart shopping lists."
    bgGradient="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100"
    iconGradient="bg-gradient-to-r from-amber-400 to-orange-500"
    underlineGradient="bg-gradient-to-r from-amber-400 to-orange-400"
    size="lg"
  />

  <FeatureCard
    icon={Target}
    title="Smart Workouts"
    description="Get AI-powered workout recommendations that evolve with your progress. Every routine is tailored to your fitness level and personal preferences."
    bgGradient="bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100"
    iconGradient="bg-gradient-to-r from-emerald-400 to-teal-500"
    underlineGradient="bg-gradient-to-r from-emerald-400 to-teal-400"
    size="lg"
  />


  <FeatureCard
    icon={MessageCircle}
    title="AI Fitness Chatbot"
    description="Get instant answers to your fitness questions with our intelligent chatbot. Receive personalized advice and motivation 24/7."
    bgGradient="bg-gradient-to-br from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100"
    iconGradient="bg-gradient-to-r from-slate-400 to-gray-500"
    underlineGradient="bg-gradient-to-r from-slate-400 to-gray-400"
    size="lg"
  />
</div>

      </main>

      {/* Footer */}
      <Footer withLogo={true} withBackground={true} />
    </div>
  )
}