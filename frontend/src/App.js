import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/LoginPage";
import Signup from "./pages/Signup/SignupPage";
import WorkoutLog from "./pages/WorkoutLog/WorkoutLogPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import WorkoutPlan from "./pages/WorkoutPlan/WorkoutPlanPage";
import Profile from "./pages/Profile/ProfilePage";
import MealGeneration from "./pages/MealGeneration/MealGenerationPage";
import GroceryList from "./pages/GroceryList/GroceryList";
import Chatbot from "./pages/Chatbot/Chatbot";
import WorkoutPlanGeneration from "./pages/workoutPlanGenerate/WorkoutPlanGeneratorPage"; 
import "./styles/global.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workout-log" element={<WorkoutLog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workout-plan" element={<WorkoutPlan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meal-generation" element={<MealGeneration />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/smart-workouts" element={<WorkoutPlanGeneration />} /> 
      </Routes>
    </div>
  );
}

export default App;
