import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register 
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}

//login
export const LoginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`, reqBody)
}

//feedback
export const feedbackApi = async (reqBody,reqHeader) => {
    return await commonApi('POST', `${serverUrl}/feedback`, reqBody, reqHeader)
}

//get feedback 
export const getAllFeedbackApi = async () => {
  return await commonApi('GET', `${serverUrl}/admin/feedback`);
}
