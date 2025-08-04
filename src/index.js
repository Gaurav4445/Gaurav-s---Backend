// require('dotenv').config({path:'./env'})
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";

dotenv.config({
  path: "./.env"
});


const app = express(); 
app.use(express.json());
app.use("/api/v1/users", userRouter); 

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("Mongo db connection failed!!!:", error);
  });



// const app=express()

// ;(async()=>{
//   try{
//    await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
//    app.on("error",()=>{
//     console.log("Error:",error);
//     throw error
//    })
//    app.listen(process.env.PORT,()=>{
//     console.log(`App is listening on port ${process.env.PORT}`);
    
//    })
//   }catch(error){
//     console.log("Error:",error)
//     throw error
//   }
// })()