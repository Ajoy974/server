const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/data1');
const userSchema = mongoose.Schema({
    name: String, 
    details:String
});

module.exports = mongoose.model("user", userSchema);
