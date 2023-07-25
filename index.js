import express from "express"
import dotenv from "dotenv"
import connect from "./config/db.js";
import morgan from "morgan";
import authroutes from "./routes/auth.js"

dotenv.config();

    connect()

const app = express()
    app.use(express.json())
    app.use(morgan("dev"))

    app.use("/auth",authroutes)

app.get("/", (req, res) => {
    res.send("<h1>server is running</h1>");
  });

  const PORT = process.env.PORT 

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT } port`)
})