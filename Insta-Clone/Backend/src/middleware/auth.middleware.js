const Jwt = require("jsonwebtoken")
async function IdentifyUser(req, res, next) {
  // token nikalao cookies se jisje pata to chale kon user request kr raah hai
  const token = req.cookies.token

  // agr token nhi to user nahi --> unauthorized user hai 

  if (!token) {
    return res.status(401).json({
      message: " Unauthorized User"
    })
  }

  let decoded

  // agr token hai to usko decode kro data nikaalo user ka or ye v verify karo ki token server hi create kiya hai 

  try {
    decoded = Jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {

    // agr surver  token create nhi  kiya to user unathorized hai ya token tempered hai 
    return res.status(401).json({
      message: "User not authorized "
    })
  }


  req.user = decoded

  next()

}

module.exports = IdentifyUser