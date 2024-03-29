const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./task')
const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age Must Be A Positive Number')
            }
        }
    },
    password:{
        type: String,
        trim:true,
        minlength:7,
        required:true,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('Password cannot contain password')
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})
userSchema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner'
})
//  methods are accessible on instances so they are also called instance methods

userSchema.methods.toJSON=function(){
    // this method is used to remove password and tokens from the response 
    const user=this
    const userObject=user.toObject()
    delete userObject.tokens
    delete userObject.password
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken=async function(){
    const user =this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}  

// static methods are accessible on models so they are also called model methods

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain user password before saving
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
    
    next()
})


// Deleting user tasks when the user is deleted
userSchema.pre('remove',async function (next) {
    const user =this
    await Task.deleteMany({owner:user._id})
    next()})

const User = mongoose.model('User', userSchema)

module.exports=User