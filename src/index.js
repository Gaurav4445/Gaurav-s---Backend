// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env"
});

connectDB();




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