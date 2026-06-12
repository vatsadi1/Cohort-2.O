 const Imagekit = require("@imagekit/nodejs")
 const {
   toFile
 } = require('@imagekit/nodejs')
 const postModel = require("../model/post.Model")
 const Jwt = require("jsonwebtoken")
 const likeModel = require("../model/likes.Model")

 // imagekit ka instance create kro using the private-key 


 const imagekit = new Imagekit({
   privatekey: process.env.IMAGEKIT_PRIVATE_KEY
 })
 const postCreation = async (req, res) => {

   // caption or files nikaalo req.body and req.file se
   console.log(req.body, req.file)

   if (!req.file) {
     return res.status(400).json({
       message: "Image file is required"
     })
   }

   // server se file ko imagekit p do 

   const file = await imagekit.files.upload({
     file: await toFile(Buffer.from(req.file.buffer), 'file'),
     fileName: "Test",
     folder: "Insta-clone"

   })

   // post crete kro database me save kro or response dedo 

   const post = await postModel.create({
     caption: req.body.caption,
     imgUrl: file.url,
     user: req.user.id
   })
   res.status(201).json({
     message: "Post created Successfully",
     post
   })

 }

 const getPost = async (req, res) => {



   const userId = req.user.id

   const posts = await postModel.find({
     user: userId
   })

   if (!posts || posts.length === 0) {
     return res.status(404).json({
       message: "No posts found for this user"
     })
   }

   res.status(200).json({
     message: "post fetched successfully",
     posts
   })
 }

 async function getPostDetails(req, res) {



   const userId = req.user.id

   const postId = req.params.postId

   const post = await postModel.findById(postId)

   if (!post) {
     return res.status(404).json({
       message: "post not found "
     })
   }

   // agr post hai to check kro ki post usi user ki hai jisne request ki hai

   const isvaliduser = post.user.toString() === userId


   if (!isvaliduser) {
     return res.status(403).json({
       message: "Forbidden Content "
     })
   }

   res.status(200).json({
     message: "post fetched successfully",
     post
   })
 }

 async function likePostController(req, res) {
   const username = req.user.username
   const postId = req.params.postId

   const ispostAvailable = await postModel.findById(postId)

   if (!ispostAvailable) {
     return res.status(404).json({
       message: "post not found"
     })
   }

   const isAlreadyLiked = await likeModel.findOne({
     user: username,
     post: postId
   })
   if (isAlreadyLiked) {
     return res.status(400).json({
       message: "Post already liked by the user"
     })
   }

   const like = await likeModel.create({
     post: postId,
     user: username,
   })
   res.status(200).json({
     message: "Post Likes Successfully",
     like
   })
 }

 async function dislikePostController(req, res) {
   const username = req.user.username
   const postId = req.params.postId

   const ispostAvailable = await postModel.findById(postId)

   if (!ispostAvailable) {
     return res.status(404).json({
       message: "post not found"
     })
   }

   const isAlreadyLiked = await likeModel.findOne({
     user: username,
     post: postId
   })
   if (!isAlreadyLiked) {
     return res.status(400).json({
       message: "Post is not liked by the user"
     })
   }

   await likeModel.findByIdAndDelete(isAlreadyLiked._id)
   res.status(200).json({
     message: "Post Dislikes Successfully",
   })
 }



 async function getfeedController(req, res) {

   // user ki id nikaalo req.user se

   const user = req.user

   // post model se sare posts nikaalo populate kro user ke sath taki user ka username aur profile image bhi aa jaye post ke sath




//  .sort({ _id: -1 }) iska matlab hai ki latest post pehle aayega feed me. kyuki mongodb me _id field me timestamp hota hai isliye hum uske basis pe sort kr rhe hai taki latest post pehle aaye feed me.
   const posts = await Promise.all((await postModel.find().sort({ _id: -1 }).populate("user").lean())

     .map(async (post) => {

       const isLiked = await likeModel.findOne({
         user: user.username,
         post: post._id
       })

       // like model se check kro ki kya ye post user ne like kiya hai ya nahi

       post.isLiked = Boolean(isLiked)

       return post

     })

   )

   res.status(200).json({
     message: 'Feed is ready',
     posts
   })

 }

 module.exports = {
   postCreation,
   getPost,
   getPostDetails,
   likePostController,
   dislikePostController,
   getfeedController
 }