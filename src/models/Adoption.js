const mongoose = require('mongoose');

const adoptionCollection = "Adoption";

const adoptionsSchema = new mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    pet:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Pet'
    }
})

const Adoption = mongoose.model(adoptionCollection,adoptionsSchema);

module.exports = Adoption;