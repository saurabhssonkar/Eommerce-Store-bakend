//const ErrorHandler=require("../utils/errorhander");
//  const app =new ErrorHandler()

//module.exports=(err,req,res,next)=>{
// err.statusCodes=err.statusCodes||500;
// err.message=err.message ||"Internal Server1 Error";
// res.status(err,statusCode).json({
//     success:false,
//     error:err,
// });

//}
// const ErrorHandler= require("../utils/errorhander");

// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal Server Error";

//   res.status(err,statusCode).json({
//     success:false,
//     error:err,
// });
// }
// help the chat gpt 
const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resoure not found . Invalid ${err.path}`
    err = new ErrorHandler(message, 404)
  }

  // mongoose duplicte ky error

  if (err.code === 1100) {

    const message = `Duplicat ${object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message, 404)
  }
  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};