const {responseManager, jobManager} = require('../services')

const create = async(request,response) => {
    try{
        const result = await jobManager.create(request.body)
        return responseManager.sendSuccessResponse(response,result,'Job Creating Successfully')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error creating job')
    }
}

const update = async(request,response) => {
    try{
        const result = await jobManager.update(request.body,request.params)
        return responseManager.sendSuccessResponse(response,result,'Job Updated Successfully')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error updating job')
    }
}

const deleteOne = async(request,response) => {
    try{
        const result = await jobManager.deleteOne(request.params)
        return responseManager.sendSuccessResponse(response,result,'Job Deleted Successfully')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error deleting job')
    }
}

const get = async(request,response) => {
    try{
        const result = await jobManager.get(request.params)
        return responseManager.sendSuccessResponse(response,result,'Job Fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error fetching jobs')
    }
}

const getAll = async(request,response) => {
    try{
        const result = await jobManager.getAll()
        return responseManager.sendSuccessResponse(response,result,'All Job Fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'No Jobs fetched!')
    }
}

const getRecommendation = async(request,response) => {
    try{
        const result = await jobManager.getRecommendation(request.body)
        return responseManager.sendSuccessResponse(response,result,'Job Recommendation found Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error Fetching Job Recommendation')
    }
}

module.exports = { create, get, getAll, update,deleteOne,getRecommendation };
