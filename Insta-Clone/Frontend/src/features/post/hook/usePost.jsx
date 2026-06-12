import {
  getFeed,
  postlike,
  postdislike,
  CreatePost
   
} from "../services/post.api";
import {  useContext,useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed  } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  const handlePostLike = async (post) => {
    const data = await postlike(post)
   handleGetFeed()
  };

  const handledislike = async (post) => {
     const data = await postdislike(post)
    handleGetFeed()
     
  };

  const handlecreatepost = async (imgfile,caption)=>{
    setLoading(true)
    const data = await CreatePost(imgfile,caption)
    setFeed([data.post,...feed])
    setLoading(false)
  }
 
  const handlefollowing = async ()=>{

  }

  return {
    loading,
    post,
    handleGetFeed,
    feed,
    setLoading,
    setPost,
    handlePostLike,
    handledislike,
    handlecreatepost
  
  };
};
