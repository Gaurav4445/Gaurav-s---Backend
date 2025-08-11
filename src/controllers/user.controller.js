import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens=async (userId)=>{
  try {
    const User=await User.findById(userId)
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()

    user.refreshToken=refreshToken
    await user.save({validateBeforeSave : false})
  
    return{accessToken,refreshToken}


  } catch (error) {
    throw new ApiError(500,"Something went wring while generating Access and refresh token")
  }
}


const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  console.log("email:", email);

  // Check for empty fields
  if ([fullname, email, username, password].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Get file paths
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload files to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // Create user
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  });

  // Fetch created user without sensitive data
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Send success response
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});


const loginUser=asyncHandler(async(req,res)=>{
// req-body -> data
// user name or email 
// find the user 
// password check
// access and refresh token generate and send it to user
// send cookies
const {email,username,password}=req.body

if(!username || !email){
  throw new ApiError(400,"username or email is required")
}

const user=await User.findOne({$or:[{username},{email}]})


if (!user) {
  throw new ApiError(404,"User does not exist")
}
const isPasswordValid= await user.isPasswordCorrect(password)
if (!isPasswordValid) {
  throw new ApiError(401,"Invalid user credentials")
}
})

const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)


export { 
  loginUser,
  registerUser };
