import User from "../models/User";
import bcrypt from "bcryptjs";


const login = async ({ email, UserId, password}) => {
    try {
        const user = await User.findOne({
            $or: [{ email: email}, {UserId: UserId}],
        });

        if (!User) throw new Error("User does not exist");
        
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        console.log(isPasswordValid);
        if(!isPasswordValid) throw new Error("Incorrect Password");

        return user;
        
    } catch(e) {
        throw new Error(e.message);
    }
};

export default login;