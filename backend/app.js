const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://DatabaseUser:9916708968@cluster0.rymui.mongodb.net/zoomData?retryWrites=true&w=majority")
.then(()=>{
console.log("Connected to Database");
})
.catch(()=>{
  console.log("Connection Failed Database");
});
const bodyParser= require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");

  next();
})

app.post('/api/posts',(req,res,next)=>{
  const post = new Post({
    title:req.body.title,
    description:req.body.description
  });
  post.save().then((result)=>{
    res.status(201).json({
      message:'Post Created Sucessfully',
      postId:result._id
    });
  });


})

app.get('/api/posts',(req,res,next)=>{

  Post.find().then((documents)=>{
    console.log(documents);
    res.status(200).json({
      message:"Post fetched sucessfully",
      posts:documents
    })
  });

  app.delete('/api/posts/:postId',(req,res,next)=>{

      console.log("Delete this -- "+req.params.postId);
      Post.deleteOne({_id:req.params.postId}).then(()=>{
        res.status(200).json({
          message:"Post Deleted sucessfully",
        })
      })

    });

});

module.exports= app;
