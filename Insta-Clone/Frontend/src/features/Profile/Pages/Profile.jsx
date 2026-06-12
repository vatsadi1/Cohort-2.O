import React, { useEffect } from "react";
import Nav from "../../shared/components/Nav";
import '../style/profile.scss'
import { useProfile } from "../hook/useProfile";
import { usePost } from "../../post/hook/usePost";
import { useAuth } from "../../auth/hooks/useAuth";
function Profile() {
const {following,handlefollowing, Followers,
    handlefollowers } = useProfile()

    const {feed,handleGetFeed } = usePost()

    const {user,handleLoginedIn } = useAuth()
     
   useEffect(() => {
  handlefollowing();
}, []);

   useEffect(() => {
 handlefollowers()
 
}, []);

   useEffect(() => {
 handleGetFeed()
 console.log( Followers)
}, []);
 
   useEffect(() => {
    handleLoginedIn()
}, []);
 
useEffect(() => {
  console.log(Followers);
}, [Followers]);

  return (
    <div className="profile-page">
      <Nav />

      <div className="profile">
        <div className="profile-header">
          <div className="profile-pic">
            <img
              src= {user ? user.profileImage : "https://via.placeholder.com/150"}
              alt="profile"
            />
          </div>

          <div className="profile-info">
            <h2>{user ? user.username : "Loading..."}</h2>
            <p>{user ? user.email : "Loading..."}</p>

            <div className="stats">
              <div className="stat">
                <h3>{feed ? feed.length : 0}</h3>
                <span>Posts</span>
              </div>

              <div className="stat">
            <h3>{Followers ? Followers.length : 0}</h3>
                <span>Followers</span>
              </div>

              <div className="stat">
              <h3>{following ? following.length : 0}</h3>
<span>Following</span>
              </div>
            </div>
          </div>
        </div>

        <div className="follow-section">
          <div className="card">
            <h3>Followers</h3>
   <h3>{Followers?.length || 0}</h3>

<ul>
  {Followers?.map((user) => (
    <li key={user}>{user.follower}</li>
  ))}
</ul>
          </div>

          <div className="card">
             <h3>Following</h3>
<ul>
  {following.map((user) => (
    <li key={user._id}>{user.followee}</li>
  ))}
</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;