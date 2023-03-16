const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
         required:true
    },
    phoneNumber:{
        type:String,
         required:true
    },
    eventsCount:{
        type:Number,
        required:true
    },
    events:[{title:String,description:String,startDate:Date,endDate:Date}]
})

const User=mongoose.model('User',userSchema)

module.exports = User