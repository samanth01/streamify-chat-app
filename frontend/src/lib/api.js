import { axiosInstance } from "./axios"


export const signup = async(signUpData)=>{
    const response = await axiosInstance.post("/auth/signup", signUpData)
    return response.data;
}


export const login  = async(logindata)=>{
    const response = await axiosInstance.post("/auth/login", logindata)
    return response.data
}

export const logout = async()=>{
    const res = await axiosInstance.post("/auth/logout")
    return res.data
}

export const getAuthUser = async ()=>{
          try {
            const res = await axiosInstance.get("/auth/me")
            return res.data
          } catch (error) {
            console.log("Error in getAuth in apijs: ", error)
            return null
            
          }


}


export const completeOnboarding = async(formData)=>{
    const res = await axiosInstance.post("/auth/onboarding", formData)
    return res.data
}

export const getUserFriends = async()=>{
  const response = await axiosInstance.get("/users/friends")
  return response.data
}

export const getRecommendedUsers = async ()=>{
  const response = await axiosInstance.get("/users")
  return response.data
}


export async function getOutgoingFriendRequests(){

  const response = await axiosInstance.get("/users/outgoing-friend-requests")
  return response.data
}

export async function sendFriendRequest(userId){
     const response = await axiosInstance.post(`/users/friend-request/${userId}`)
     return response.data
}

export async function getFriendRequests(){
  const response = await axiosInstance.get("/users/friend-requests")
  return response.data
}

export async function acceptFriendRequests(requestId){
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`)
  return response.data
}



export async function getStreamToken(){
  const response = await axiosInstance.get("/chat/token")
  return response.data
}