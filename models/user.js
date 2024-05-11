const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/isLogedIn`);

const userSchema = mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email : String,
    password : {
        type : String,
        required : true
    },
    age : Number
})

module.exports = mongoose.model("user",userSchema);