var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
   name: String,
   description: String,
   color: String,
   time: Number
});


module.exports = mongoose.model("Task", taskSchema);