const { responseManager, profileManager } = require("../services")

const create = async(request,response) => {
    try{
        const result = await profileManager.create(request.body,request.user)
        return responseManager.sendSuccessResponse(response,result,'Profile Created Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Profile cant be created')
    }
}


const get = async(request,response) => {
    try{
        const result = await profileManager.get(request.user)
        return responseManager.sendSuccessResponse(response,result,'Profile fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Profile cant be  fetched successfully!')
    }
}


const getAll = async(request,response) => {
    try{
        const result = await profileManager.getAll()
        return responseManager.sendSuccessResponse(response,result,'All Profile fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Profile cant be  fetched successfully!')
    }
}



module.exports = {create,get,getAll}