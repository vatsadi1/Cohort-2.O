import { useState } from "react";
import { getFollowing,getfollower } from "../services/Profile.services";

export const useProfile = () => {
  const [following, setFollowing] = useState([]);
const [Followers,setFollowers] = useState([])
  const handlefollowing = async () => {
    const data = await getFollowing();

    setFollowing(data.following);
  };

  const handlefollowers = async () =>{
    const data = await getfollower()
    setFollowers(data.followers)
  }

  return {
    following,
    handlefollowing,
    Followers,
    handlefollowers
  };
};