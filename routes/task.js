const express = require('express')
const router = express()
const Task = require('../models/taskmodel')
const mongoose = require('mongoose')
const url = 'mongodb+srv://satarupa:satarupa0412@cluster0.27g7h.mongodb.net/taskdb?retryWrites=true&w=majority'
mongoose.connect(url, {useNewUrlParser: true    })
const con = mongoose.connection

router.use(express.json())
con.on('open', function(){
    console.log("connected task.js")
})


router.get('/', async(req, res) => {
     try{
         const tasks = await Task.find()
         res.json(tasks)
     }
     catch(err){
         res.send('Error' + err)
     }
})

router.get('/:id', async(req, res) => {
    try{
        const task = await Task.findById(req.params.id)
        res.json(task)
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.post('/', async(req, res) => {
    console.log(JSON.stringify(req.body))
    const task = new Task({
        name: req.body.name
    })
    try{
       const t1 = await task.save()
       res.json(t1)
    }
    catch(err){
    res.send('Error')
    }
})
router.patch('/:id', async(req, res) => {
    try{
    const task = await Task.findById(req.params.id)
     task.name = req.body.name
     const a1 = await task.save()
     res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id', async(req, res) => {
    try{
    const task = await Task.findById(req.params.id)
     task.name = req.body.name
     const a1 = await task.remove()
     res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})

router.listen(9000, function(){
    console.log(" server connected")
})

module.exports = router