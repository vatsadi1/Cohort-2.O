import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function getFeed() {
    const response = await api.get("/api/post/feed")
    return response.data
}

export async function postlike(postId) {

    const response = await api.post("/api/post/like/"+ postId)
    return response.data
    
}

export async function postdislike(postId) {
    const response = await api.post("/api/post/dislike/"+ postId )
    return response.data
    
}

export async function  CreatePost(Imgfile,caption) {

    const formdata = new FormData()

    formdata.append('image',Imgfile)
    formdata.append('caption',caption)

    const response = await api.post('/api/post',formdata)

    return response.data
    
}
 