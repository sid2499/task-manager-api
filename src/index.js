const express = require('express')
// we just need the mongoose file to run so that it gets connected to database
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const app = express()
const port = process.env.PORT


// --->middlewares
// app.use((req,res,next)=>{
//     // console.log(req.method,req.path)
//     // next()
//     if(req.method==='GET'){
//         res.send('Get requests are disabled')
//     }
//     else{
//         next()
//     }

// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is Under maintainence .. Try again shortly')
// })

// --->middlewares end

// Automatically parses incoming data as json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// 
// Without middleware : mew request -> run route handler
// 
// With middleware :   new request -> do something -> run route handler
// 





app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})


