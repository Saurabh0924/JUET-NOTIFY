import express from 'express'
import mongoose from 'mongoose'
import blogrouter from './routes/blog-routes.js'
import router from './routes/user-routes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors());

app.use("/api/user",router)
app.use("/api/blog",blogrouter)


mongoose.connect('mongodb+srv://admin:cSr4Dyp1aBOxDRoG@cluster0.1b4ysuk.mongodb.net/Blog?retryWrites=true&w=majority')

.then(()=>app.listen(5000))
.then(()=>console.log(`server connected to the port successfully`))
.catch((error)=>console.log(error))

// cSr4Dyp1aBOxDRoG