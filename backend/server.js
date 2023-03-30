const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//DB configs
//mongoose
 // .connect("")
  //.catch((err) => console.log(err));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})
const postSchema = mongoose.Schema({
  title: String,
  description: String,
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.send("express is here");
});

app.post("/create", (req, res) => {

  Post.create({
    title: req.body.title,
    description: req.body.description,
  })
  .then((doc)=>console.log(doc))
  .catch((err)=>(err))
 // console.log(req.body)
  //const newPost = new Post({
   // title: req.body.title,
    //description: req.body.description,
  });

  //newPost
    //.save()
    //.then((doc) => console.log(doc))
    //.catch((err) => console.log(err));
//});
app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("Express server is running");
});