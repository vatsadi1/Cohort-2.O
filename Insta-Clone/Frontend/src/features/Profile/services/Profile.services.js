import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function getProfile() {
    const response = await api.get("/api/auth/get-me")
    return response.data
}

export async function getFollowing() {

    const response = await api.get("/api/users/following")
 return response.data
}

export async function getfollower(){
    const response = await api.get("/api/users/follower")
    return response.data
}