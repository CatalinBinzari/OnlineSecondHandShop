let admin = (req,res,next) =>{
    if(req.user.role === "customer" ){
        return res.send('you are not allowed, get out now.')
    }
    next();
}

module.exports = { admin }