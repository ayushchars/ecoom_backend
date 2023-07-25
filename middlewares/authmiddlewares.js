import JWT  from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
// PROTECT USER

export const requireSignin = async (req,res,next)=>{
    try{
        const decode = JWT.verify(
            req.headers.authorization,
             process.env.JWT_SECREAT
             );
             req.user = decode;
             next()

    }
    catch(error){
        console.log(error)
    }
}
export const isAdmin = async (req, res, next) => {
    try {
        const user = await usermodel.findById(req.user._id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized Access."
            });
        }

        // If the user is an admin, call the next middleware or route handler.
        next();

    } catch (error) {
        console.error("Error in isAdmin:", error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while processing your request."
        });
    }
};

