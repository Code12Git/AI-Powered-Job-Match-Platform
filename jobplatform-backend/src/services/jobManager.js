const { generateJobRecommendation } = require("../helpers/generativeAi");
const { jobModel } = require("../models");
const profile = require("../models/profile");
const { AppError } = require("../utils");
const { NOT_FOUND } = require("../utils/errors");
const _ = require('lodash')

const create = async (body) => {
    const { title, description, company, skills,jobType, location, experience,salary } = body;
    try {
        const job = await jobModel.create({title,description,company,skills,location,jobType,experience,salary});
        return job;
    } catch (err) {
        throw err;
    }
};


const update = async (body,params) => {
    const {id} = params;
    const { title, description, company, skills,jobType, location } = body;
    try{
        const job = await jobModel.findByIdAndUpdate(id,{title, description, company, skills,jobType, location},{new:true})
        if(!job) throw new AppError({...NOT_FOUND,message:'Job not found!'})
        return job;    
    }catch(err){
        throw err;
    }
}

const deleteOne = async (params) => {
    const {id} = params;
    try{
        const job = await jobModel.findByIdAndDelete(id)
        if(!job) throw new AppError({...NOT_FOUND,message:'Job not found!'})
        return job;    
    }catch(err){
        throw err;
    }
}

const get = async (params) => {
    const { jobId } = params;
    try {
        if (!jobId) throw new AppError({ ...NOT_FOUND, message: 'Job Id is required!' });
        
        const job = await jobModel.findById(jobId);
        if (!job) throw new AppError({ ...NOT_FOUND, message: 'Job not found!' });
        
        return job;
    } catch (err) {
        throw err;
    }
};

const getAll = async () => {
    try {
        const jobs = await jobModel.find();
        return jobs;
    } catch (err) {
        throw err;
    }
};

const getRecommendation = async(body) => {
    const {profileData,jobData} = body;
    if(_.isEmpty(profileData.skills) || _.isEmpty(profileData.experience) || _.isEmpty(profileData.jobType))  {
        throw new AppError({...NOT_FOUND,message:'All fields should be present'})
    }
    try{
        const recommendation=await generateJobRecommendation(profileData,jobData)
        console.log("Recommendation",recommendation)
        return recommendation;
    }catch(err){
        throw err;
    }
}

module.exports = { create, get, getAll, update, deleteOne,getRecommendation };