import { asyncHandler } from "../utils/asynchandler.js";



const registerUser = asyncHandler(async (req,res)=>{
  //get user details from fronotend
  //validation - not empty
  //check if user already exists
   return res.status(200).json({
    message:"hello postman"
  })
})

export {registerUser}
