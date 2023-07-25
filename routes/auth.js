import express from "express";
import  {registerControllar, loginControllar,testconrollar} from "../controlar/authControlar.js"
import { isAdmin, requireSignin } from "../middlewares/authmiddlewares.js";
//router Object

const router = express.Router()

//Register
router.post("/register", registerControllar)

//Login User 

router.post("/login", loginControllar)

//Test Router

router.get("/test",requireSignin,isAdmin, testconrollar)



export default router