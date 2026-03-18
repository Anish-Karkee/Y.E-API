import { Admin } from "mongodb";


const roleMiddleware = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.Admin)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    }
}
export default roleMiddleware;


const isAdmin = ()=>{
    return(req,res,next)=>{

        if(req.user.roles != "admin" ){
            return res.status(403).json({message:"Access denied"})
        }
        next()

    }
}



Router.get("/",protect, roleMiddleware("admin"))