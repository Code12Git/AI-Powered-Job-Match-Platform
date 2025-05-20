const { profileModel, userModel } = require("../models");
const { AppError } = require("../utils");
const { NOT_FOUND } = require("../utils/errors");

const create = async (body, user) => {
  const { job_title, company, start_date, end_date, description } = body;
  const { userId } = user;
  try {
    const user = await userModel.findById(userId);
    if (!user) throw new AppError({ ...NOT_FOUND, message: "User not found!" });
    const profile = await profileModel.create({
      job_title,
      company,
      start_date,
      end_date,
      description,
      user: userId,
    });
    return profile;
  } catch (err) {
    throw err;
  }
};

const get = async (params) => {
  const { id } = params;

  if (!id) {
    throw new AppError({ ...BAD_REQUEST, message: "Profile ID is required" });
  }

  try {
    const profile = await profileModel.findById(id);

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
