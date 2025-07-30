import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
//This is user Schema
const userSchema=new Schema({
username:{
  type:String,
  required:true,
  unique:true,
  lowercase:true,
  trim:true,
  index:true//Used for searching in database , this just optimises searching. Not eberything should be indexed.
},
email:{
  type:String,
  required:true,
  unique:true,
  lowercase:true,
  trim:true,
},
fullname:{
  type:String,
  required:true,
  trim:true,
  index:true,
},
avatar:{
  type:String,//Cloudinary URL: 
  required:true,
},
coverImage:{
  type:String,//Cloudinary for this also
},
watchHistory:[
  {
    type:Schema.Types.ObjectId,
    ref:"Video",

  }
],
password:{
  type:String,
  required:[true,'Password is Required']
},
refreshToken:{
  type:String
  
},
},
{
  timestamps:true

}
)

userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next() //like a negative check
  
 this.password=bcrypt.hash(this.password,10)
 next()
})

userSchema.methods.isPasswordCorrect=async function(password) {
  return await bcrypt.compare(password,this.password)
}
//Both are jwt tokens
userSchema.methods.generateAccessToken =function(){
   return jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username,
      fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIN:process.env.ACCESS_TOKEN_SECRET
    }
   )
}
userSchema.methods.generateRefreshToken =function(){
   return jwt.sign(
    {
      _id:this._id,
     
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIN:process.env.REFRESH_TOKEN_EXPIRY
    }
   )
}


export const User=mongoose.model("User")