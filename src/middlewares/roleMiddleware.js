import { Admin } from "mongodb";


const roleMiddleware = (Admin) => {
    return(req, res, next) => {
        if(!Admin.includes(req.user.Admin)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    }
}
export default roleMiddleware;