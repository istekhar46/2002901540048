import express from "express";
import dotenv from "dotenv";
import trainRoutes from "./routes/trainRoutes.js"
import { errorHandler} from './middleware/errorMiddleware.js'
dotenv.config();


const port =  process.env.PORT;
const app = express()


app.get('/',(req, res)=>{
    res.send ("Hello server!!")
})


// register user.. 
app.use('/train', trainRoutes)

// authorization.. 
app.use('/train', trainRoutes)

// getting tains ..
app.use('/train', trainRoutes)

app.use(errorHandler)

app.listen (port, ()=> console.log(`Server is running on the port http://localhost:${port}`))
