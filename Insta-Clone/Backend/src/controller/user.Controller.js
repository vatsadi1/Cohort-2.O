 const followerModel = require("../model/follow.model.js")
const userModel = require("../model/User.Model.js")

 async function followerUserController(req,res) {
    
    const followerUsername = req.user.username
    const followeeUsername = req.params.username
    const status = req.params.status

if(followeeUsername == followerUsername){
    return res.status(403).json({
        message:"You cannot follow yourself"
    })
}
const isuserexist = await userModel.findOne({
    username:followeeUsername,

}) 

if(!isuserexist){
    return res.status(404).json({
        message:"User not found"
    })
}

const isAlreadyFollowing = await followerModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
})
if(isAlreadyFollowing && isAlreadyFollowing.status === "accepted"){
    return res.status(400).json({
        message:"You are already following this user"
    })
}

 
 let followRecords = await followerModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
 })

 let newStatus;
  if (status === "pending") newStatus = "pending";
  else if (status === "accept") newStatus = "accepted";
  else if (status === "reject") newStatus = "rejected";
  else return res.status(400).json({ message: "Invalid status" });

  if (followRecords) {
    followRecords.status = newStatus;
    await followRecords.save();
  } else {
    followRecords = await followerModel.create({
      follower: followerUsername,
        followee: followeeUsername,
        status: newStatus
    });
  }
  

 
    res.status(201).json({
        message:`You are following ${followeeUsername}`,
        follower:followRecords
    })

 }

 async function unfollowUser(req,res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserfollowing = await followerModel.findOne(
        {
            follower:followerUsername,
            followee:followeeUsername
        }
    )
    if(!isUserfollowing ){
        return res.status(404).json({
            message:"you are  not following this user"
        })
    }

    await followerModel.findByIdAndDelete(isUserfollowing._id)

    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })
    
 }

//all users that logined user follows:

 async function getfollowingController(req,res) {

  const following = await followerModel.find({
  follower: req.user.username
})  .select("followee -_id");;

res.status(200).json({
  success: true,
  following
});

res.status(200).json({
    success:true,
        following:following
        })

 }

//all followers of the logged-in user

 async function followersController(req,res){
    const followers = await followerModel.find({
        followee:req.user.username
    }).select("follower -_id")
    res.status(200).json({
        success:true,
         followers
     })
 }
 module.exports = {followerUserController,unfollowUser,getfollowingController,followersController}