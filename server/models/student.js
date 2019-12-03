var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
	username: String,
    password: String,
    email: String, 
    firstName: String,
    lastName: String,
    room: Number   
});

module.exports = mongoose.model("Student", studentSchema);