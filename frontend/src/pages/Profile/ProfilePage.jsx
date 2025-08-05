// Profile/ProfilePage.jsx

"use client";

import { useState, useEffect } from "react";
import Header from "../../components/ui/header";
import HeaderButton from "../../components/ui/HeaderButton";
import PageHeader from "../../components/ui/PageHeader";
import ProfileCardWrapper from "./ProfileCardWrapper";
import ProfileForm from "./ProfileForm";
import ProfileView from "./ProfileView";
import NoProfileCard from "./NoProfileCard";
import { User, Edit3 } from "lucide-react";
import { getProfile, saveProfile } from "../../api/profileAPI";
import { calculateAge } from "./utils";
import BackButton from "../../components/ui/BackButton";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    gender: "",
    dateOfBirth: "",
    weight: "",
    height: "",
    goal: "",
    foodAllergies: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
      setFormData({
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        weight: data.weight.toString(),
        height: data.height,
        goal: data.goal,
        foodAllergies: data.foodAllergies || "N/A",
      });
      setHasProfile(true);
    } catch (err) {
      if (err.status === 404) {
        setHasProfile(false);
        setIsEditing(true);
      } else {
        console.error("Failed to fetch profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const profileData = {
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        weight: parseInt(formData.weight),
        height: formData.height,
        goal: formData.goal,
        foodAllergies: formData.foodAllergies || "N/A",
      };

      const data = await saveProfile(profileData, hasProfile);
      setProfile(data);
      setHasProfile(true);
      setIsEditing(false);
    } catch (err) {
      const error = await err.json?.();
      alert(error?.error || "Failed to save profile");
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth,
      weight: profile.weight.toString(),
      height: profile.height,
      goal: profile.goal,
      foodAllergies: profile.foodAllergies || "N/A",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header
      />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4">
  <BackButton />
  <PageHeader
    icon={User}
    title="My Profile"
    subtitle="Manage your personal information and fitness goals"
    className="mb-0"
  />
</div>


          {hasProfile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg mt-4 md:mt-0 px-4 py-2 rounded-md flex items-center"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </button>
          )}
        </div>

        <ProfileCardWrapper>
          {isEditing ? (
            <ProfileForm
              formData={formData}
              setFormData={setFormData}
              saving={saving}
              handleSave={handleSave}
              handleCancel={handleCancel}
              hasProfile={hasProfile}
            />
          ) : hasProfile ? (
            <ProfileView profile={profile} />
          ) : (
            <NoProfileCard setIsEditing={setIsEditing} />
          )}
        </ProfileCardWrapper>
      </main>
    </div>
  );
}
