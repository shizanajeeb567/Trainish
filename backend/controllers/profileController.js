const profileService = require('../services/profileService');

exports.createProfile = async (req, res) => {
  const userId = req.user.id;
  const profileData = req.body;

  try {
    const profile = await profileService.createProfile(userId, profileData);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await profileService.getProfile(userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const updatedFields = req.body;

  try {
    const updatedProfile = await profileService.updateProfile(userId, updatedFields);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await profileService.deleteProfile(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
