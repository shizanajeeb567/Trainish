const Profile = require('../models/Profile');

exports.createProfile = async (userId, profileData) => {
  const existing = await Profile.findOne({ where: { userId } });
  if (existing) {
    throw new Error('Profile already exists for this user');
  }

  const profile = await Profile.create({
    userId,
    ...profileData,
  });

  return profile;
};

exports.getProfile = async (userId) => {
  const profile = await Profile.findOne({ where: { userId } });

  if (!profile) {
    throw new Error('Profile not found');
  }

  return profile;
};

exports.updateProfile = async (userId, updatedFields) => {
  const profile = await Profile.findOne({ where: { userId } });

  if (!profile) {
    throw new Error('Profile not found');
  }

  await profile.update(updatedFields);
  return profile;
};

exports.deleteProfile = async (userId) => {
  const profile = await Profile.findOne({ where: { userId } });

  if (!profile) {
    throw new Error('Profile not found');
  }

  await profile.destroy();
  return { message: 'Profile deleted successfully' };
};
