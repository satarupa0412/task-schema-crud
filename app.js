const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://satarupa:satarupa0412@cluster0.27g7h.mongodb.net/taskdb?retryWrites=true&w=majority'

const app = express()
mongoose.connect(url, {useNewUrlParser: true    })
const con = mongoose.connection

con.on('open', function(){
    console.log("connected")
})

app.use(express.json())

const taskRouter = require('./routes/task')
app.use('/task',taskRouter)

app.listen(9000, function(){
    console.log(" server connected")
})