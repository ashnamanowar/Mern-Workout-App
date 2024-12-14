const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema= new Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type:Number,
        required: true
    },
    load:{
        type:Number,
        required: true
    },
    progress: {
        type: Number,   
        default: 0     
      }
},{ timestamps: true});

const Workout=mongoose.model('Workout',workoutSchema)
module.exports=Workout
