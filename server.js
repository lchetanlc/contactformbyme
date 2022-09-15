const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://lchetanlc:mypassword@cluster0.eiodoqw.mongodb.net/cantact?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  { useUndefinedTopology: true }
);

//create data schema
const formSchema = {
  first: String,
  last: String,
  email: String,
  website: String,
  message: String,
};
const Form = mongoose.model("Form", formSchema);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/main", function (req, res) {
  res.sendFile(__dirname + "/main.html");
});

//app.post
app.post("/", function (req, res) {
  let newForm = new Form({
    first: req.body.first,
    last: req.body.last,
    email:req.body.email,
    website:req.body.website,
    message:req.body.message,
  });
  newForm.save();
  res.redirect("/main");
});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}
app.listen(port, function () {
  console.log("server is running");
});
