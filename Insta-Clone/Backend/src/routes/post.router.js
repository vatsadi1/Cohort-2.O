const express = require("express")
const IdentifyUser = require("../middleware/auth.middleware.js")
const multer = require('multer')
const {
    postCreation,
    getPost,
    getPostDetails,
    likePostController,
    getfeedController,
    dislikePostController
} = require("../controller/post.Controller")
 
const upload = multer({
    storage: multer.memoryStorage()
})

/*
post-> "/"
*/

const postRouter = express.Router()

postRouter.post("/", upload.single("image"), IdentifyUser, postCreation)
postRouter.get("/", IdentifyUser, getPost)

/**
 * Get/api/post/details/:postid
 * - return an details about specific post with the id. also check whether the post belong to the user request come from
 */

postRouter.get("/details/:postId", IdentifyUser, getPostDetails)

// @route post /api/user/like/:postID
// @description: Like a post
// @access: Private
postRouter.post("/like/:postId", IdentifyUser, likePostController)
postRouter.post("/dislike/:postId", IdentifyUser, dislikePostController)

/**
 * route: get /api/post/feed
 * @description: Get a feed of posts
 * @access: Private
 */

postRouter.get("/feed",IdentifyUser,getfeedController)
module.exports = postRouter