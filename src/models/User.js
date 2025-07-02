const mongoose = require('mongoose');

const userCollection = 'User';

const usersSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        default:'user'
    },
    pets:{
        type:[
            {
                _id:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'Pet'
                }
            }
        ],
        default:[]
    },
    timestampLastLogin: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model(userCollection, usersSchema);

module.exports = User;