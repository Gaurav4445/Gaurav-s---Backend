const asyncHandler=(requestHandler)=>{
  return (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
  }
}

export {asyncHandler}


// const ayncHandler=(fn)=>async(req,res,next)=>{
//   try {
//     await fn(res,res,next)
//   } catch (error) {
//     res.status(error.code||500).json({
//       sucess:flase,
//       message:error.message
//     })
//   }
// }