const express = require('express');
const {
    followerUserController,
    unfollowUser,
    getfollowingController,
  followersController
} = require('../controller/User.Controller');
const IdentifyUser = require("../middleware/auth.middleware");
const {
    route
} = require('./post.router');

const userRouter = express.Router()

// @route post /api/user/follow/:username
// @description: Follow a user
// @access: Private

userRouter.post("/follow/:username/:status", IdentifyUser, followerUserController)

// @route post /api/user/unfollow/:username
// @description: Unfollow a user
// @access: Private
userRouter.post("/unfollow/:username", IdentifyUser, unfollowUser)

userRouter.get("/following",IdentifyUser,getfollowingController)
userRouter.get("/follower",IdentifyUser, followersController)
 


module.exports = userRouter