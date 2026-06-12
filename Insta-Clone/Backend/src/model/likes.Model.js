const mongoose = require("mongoose")

const LikeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: [true, "post id is reuired for like"]
  },
  user: {
    type: String,
    required: [true, "user id is reuired for like"]
  }
}, {
  timestamps: true
})

//same user can like a post only once

LikeSchema.index({
  post: 1,
  user: 1
}, {
  unique: true
})

const likeModel = mongoose.model("Likes", LikeSchema)

module.exports = likeModel