// Profile/utils.js

export const genderOptions = [
  { value: "Male", label: "Male", color: "from-blue-400 to-blue-600", icon: "👨" },
  { value: "Female", label: "Female", color: "from-pink-400 to-pink-600", icon: "👩" },
  { value: "Other", label: "Other", color: "from-purple-400 to-purple-600", icon: "⚧️" },
];

export const goalOptions = [
  { value: "Weight Loss", icon: "📉", color: "from-red-400 to-red-600" },
  { value: "Muscle Gain", icon: "💪", color: "from-green-400 to-green-600" },
  { value: "Maintain Weight", icon: "⚖️", color: "from-blue-400 to-blue-600" },
  { value: "Improve Endurance", icon: "🏃", color: "from-orange-400 to-orange-600" },
  { value: "General Fitness", icon: "🎯", color: "from-purple-400 to-purple-600" },
  { value: "Strength Training", icon: "🏋️", color: "from-gray-400 to-gray-600" },
];

export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const getSelectedGender = (gender) => {
  return genderOptions.find((option) => option.value === gender);
};

export const getSelectedGoal = (goal) => {
  return goalOptions.find((option) => option.value === goal);
};
