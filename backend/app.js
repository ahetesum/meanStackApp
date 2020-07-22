const express = require('express');
const app = express();
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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message:'Post Created Sucessfully'
  });

})

app.get('/api/posts',(req,res,next)=>{

  const posts=[
    {id:"qwe124123eqw",title:"First Post",description:"This is coming from server"},
    {id:"fdg234324ret",title:'Second Post',description:"this is also coming from server"}
  ];

  res.status(200).json({
    message:"Post fetched sucessfully",
    posts:posts
  })
});

module.exports= app;
