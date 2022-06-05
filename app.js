const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Post = require('./Models/Post');

const app = express();

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// console.log("db connected");

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// ROUTES
app.get('/', async (req, res) => {
  const dbPosts = await Post.find()
  res.render('index', {
    dbPosts
  });
});

app.get('/posts/:id', async (req, res) => {
  const allPosts = [await Post.findById(req.params.id)]
  res.render("posts", {
    allPosts
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/posts', async (req, res) => {
  const allPosts = await Post.find()
  res.render('posts', {
    allPosts
  });
});

app.post('/add_post', async (req, res) => { 
  await Post.create(req.body)      
  res.redirect('/')
});

const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
