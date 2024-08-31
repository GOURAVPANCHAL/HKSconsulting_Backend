const mongoose  = require("mongoose")

const formSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    cover_letter:{
        type:String,
        required:true
    },
},{timestamps:true})

// const formdata = mongoose.model("")