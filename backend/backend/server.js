const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
var cors = require('cors')
const app = express()
app.use(cors())
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = 5000 

connectDB()


app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/', require('./routes/userRoutes'))
app.use('/subgred',require('./routes/subgredRoutes'))
app.use('/posts',require('./routes/postRoutes'))

app.use(errorHandler)
app.listen(port, () => console.log(`Server Started on port ${port}`))