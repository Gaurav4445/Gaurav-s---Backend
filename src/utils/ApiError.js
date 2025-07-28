class ApiError extends Error{
  constructor(
    statusCode,
    message="Something went wrong",
    errors=[],
    statck=""
  )
    
  {
super(message)
this.statusCode=statusCode
this.data=null
this.succcess=false
this,errors =errors
this.messsage=message

  }


}
export {ApiError}