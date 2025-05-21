const { profileModel, userModel } = require("../models");
const { AppError } = require("../utils");
const { NOT_FOUND } = require("../utils/errors");

const create = async (body, user) => {
  const { skills, jobType, location, experience } = body;
  const { _id } = user;

  try {
    const foundUser = await userModel.findById(_id);
    if (!foundUser) {
      throw new AppError({ ...NOT_FOUND, message: "User not found!" });
    }

     const existingProfile = await profileModel.findOne({ user: _id });

    if (existingProfile) {
       const updatedProfile = await profileModel.findOneAndUpdate(
        { user: _id },
        { skills, jobType, location, experience },
        { new: true }  
      );
      return updatedProfile;
    } else {
       const newProfile = await profileModel.create({
        skills,
        jobType,
        location,
        experience,
        user: _id,
      });
      return newProfile;
    }
  } catch (err) {
    throw err;
  }
};

const get = async (user) => {
  const { id } = user;

  if (!id) {
    throw new AppError({ ...BAD_REQUEST, message: "User ID is required" });
  }

  try {
    const profile = await profileModel.findOne({ user: id });
    console.log("Profile:",profile)
    if (!profile) {
      throw new AppError({ ...NOT_FOUND, message: "Profile not found" });
    }

    return profile;
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    const profile = await profileModel.find();

    if (!profile) {
      throw new AppError({ ...NOT_FOUND, message: "No profile found" });
    }

    return profile;
  } catch (err) {
    throw err;
  }
};

module.exports = { create, get, getAll };
