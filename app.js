import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import { connectDb } from './config/dbConfig.js';
import corsOptions from './config/corsOptions.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import credentials from './middlewares/credentials.js';
import authRoutes from './routes/auth.routes.js'
import indexRoutes from "./index.js"
import tokenValidator from "./middlewares/verifyToken.js"
import { addProduct } from './controllers/product/addProduct.js';
dotenv.config()


const app = express()

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/auth", authRoutes)
app.use("/api", tokenValidator, indexRoutes)
app.post("/addProduct", addProduct)

const httpServer = http.createServer(app)

httpServer.listen(process.env.PORT, async () => {
    try {
        const isConnected = await connectDb()
        console.log(isConnected);
    } catch (error) {
        console.log(error);
    }

})