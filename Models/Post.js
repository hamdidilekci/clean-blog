const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  description: String,
  dateCreated: {type: Date, default: Date.now}
})

const Post = mongoose.model('post', PostSchema);

module.exports = Post;