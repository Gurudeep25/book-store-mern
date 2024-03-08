import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow all origins with default of cors()
app.use(cors())
//Option 2: Allow custom origins
// app.use(
//     cors({
//         origin : 'http://localhost:3000',
//         methods : ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders : ['Content-Type']
//     })
// )

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to MERN Stack Tutorial');
})

app.use('/books', booksRoute)

mongoose.connect(mongodbURL)
.then(() => {
    console.log('App is connected to DB')
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    })
})
.catch((error) => {
    console.log(error)
})