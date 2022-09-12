//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema ={
  name: String,
};

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item ({
  name: "welcome to your to do list"
});
const item2 = new Item ({
  name: "Hit +"
});
const item3 = new Item ({
  name: "Hit -"
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
  if (err){
    console.log(err);
  } else{
    console.log("Success");
  }
});

Item.find({}, function(err, results){
  if (err){
    console.log(err);
  } else{
    console.log(results);
  }
});

app.get("/", function(req, res) {
  Item.find({}, function(err, results){
    res.render("list", {listTitle: "TODAY", newListItems: results});
  });



});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
