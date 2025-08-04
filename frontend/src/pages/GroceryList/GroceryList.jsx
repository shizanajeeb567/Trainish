"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import {  List, ShoppingCart, ArrowLeft, Info } from "lucide-react"
import Header from "../../components/ui/header";
import PageHeader from "../../components/ui/PageHeader";
import { getGroceryList, getLatestMealPlan } from "../../api/groceryAPI";

import HeaderButton from "../../components/ui/HeaderButton";
export default function GroceryList() {
  const [groceryItems, setGroceryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
const [openGroups, setOpenGroups] = useState({});
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const mealPlanId = queryParams.get("mealPlanId")
const toggleGroup = (letter) => {
  setOpenGroups((prev) => ({
    ...prev,
    [letter]: !prev[letter],
  }));
};

 useEffect(() => {
  if (mealPlanId) {
    fetchGroceryList(mealPlanId);
  } else {
    fetchLatestMealPlanAndList();
  }
}, [mealPlanId]);

const fetchLatestMealPlanAndList = async () => {
  setLoading(true);
  setError(null);
  try {
    const plans = await getLatestMealPlan();
    if (plans.length > 0) {
      const latestPlanId = plans[0].id;
      fetchGroceryList(latestPlanId);
    } else {
      setError("You don't have any meal plans yet. Generate one first.");
      setGroceryItems([]);
    }
  } catch (err) {
    console.error("Error fetching meal plans:", err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const fetchGroceryList = async (id) => {
  setLoading(true);
  setError(null);
  try {
    const data = await getGroceryList(id);
    setGroceryItems(data);
  } catch (err) {
    console.error("Error fetching grocery list:", err);
    setError(err.error || "Error fetching grocery list. Please try again later.");
    setGroceryItems([]);
  } finally {
    setLoading(false);
  }
};






 const groupedItems = groceryItems.reduce((acc, item) => {
  const category = item.category || "Other";
  if (!acc[category]) acc[category] = [];
  acc[category].push(item);
  return acc;
}, {});


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
     <Header
/>


      <main className="w-full max-w-7xl mx-auto px-4 py-8">

        {/* Page Header */}
       
<div className="flex items-center gap-4 mb-8">
  <Button
    variant="ghost"
    size="icon"
    onClick={() => window.history.back()}
    className="text-gray-600 hover:text-purple-600"
  >
    <ArrowLeft className="h-6 w-6" />
    <span className="sr-only">Go Back</span>
  </Button>

  <PageHeader
    icon={ShoppingCart}
    title="Grocery List"
    subtitle="Your essential ingredients for the selected meal plan"
    className="mb-0"
  />
</div>

        {loading && (
          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading grocery list...</p>
            </CardContent>
          </Card>
        )}

       {error && (
  <Card className="mb-6 border-0 bg-yellow-50/80 backdrop-blur-sm shadow-md">
    <CardContent className="p-6 flex items-start gap-4">
      <Info className="h-6 w-6 text-yellow-600 mt-1" />
      <div>
        <h3 className="text-lg font-semibold text-yellow-700">No grocery list!!</h3>
        <p className="text-gray-700">
          {error}{" "}
          <Link to="/meal-generation" className="text-yellow-800 font-medium underline">
            Go to Meal Plans
          </Link>
        </p>
      </div>
    </CardContent>
  </Card>
)}


        {!loading && !error && groceryItems.length === 0 && (
  <Card className="border-0 bg-white/70 backdrop-blur-sm">
    <CardContent className="p-8 text-center">
      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">No grocery items found</h3>
      <p className="text-gray-500">Generate a meal plan first to see your grocery list here.</p>
      <Button
        className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
        asChild
      >
        <Link to="/meal-generation">Generate Meal Plan</Link>
      </Button>
    </CardContent>
  </Card>
)}

{!loading && !error && groceryItems.length > 0 && (
  <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl text-gray-800 flex items-center">
        <List className="mr-2 h-5 w-5 text-purple-600" />
        Your Shopping List
      </CardTitle>
      <CardDescription className="text-gray-600">Meal Plan ID: {mealPlanId}</CardDescription>
    </CardHeader>
  <CardContent>
 {Object.entries(groupedItems)
  .sort(([a], [b]) => a.localeCompare(b)) 
  .map(([category, items]) => (
    <div key={category} className="mb-6">
      <button
        onClick={() => toggleGroup(category)}
        className="w-full text-left text-xl font-semibold text-purple-700 bg-purple-100 px-4 py-2 rounded hover:bg-purple-200 transition"
      >
        {category} {openGroups[category] ? "▴" : "▾"}

      </button>

      {openGroups[category] && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="p-3 border border-purple-100 rounded-lg bg-purple-50/50 shadow-sm"
            >
              <p className="text-base font-medium text-gray-800">
                {item.ingredientName || item.name || item.title || "Unnamed"}
                <span className="ml-1 text-sm text-gray-600 font-normal">
                  ({item.quantity} {item.unit})
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
))}

</CardContent>


  </Card>
)}

      </main>
    </div>
  )
}
