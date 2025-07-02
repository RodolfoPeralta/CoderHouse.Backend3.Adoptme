const mongoose = require('mongoose');

const petCollection = "Pet";

const petsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    specie:{
        type:String,
        required:true
    },
    birthDate:Date,
    adopted:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    image:String
})

const Pet = mongoose.model(petCollection, petsSchema);

module.exports = Pet;