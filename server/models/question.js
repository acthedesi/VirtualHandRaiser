var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    question: String,
    likes: Number,
    room: Number,
    isClicked: Array
});

module.exports = mongoose.model("Questions", questionSchema);