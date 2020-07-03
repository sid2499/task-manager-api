const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true, useUnifiedTopology: true,
    useFindAndModify:false
})



// const me = new User({
//     name: '   Jenn   ',
//     email: 'jenN@gmai.com',
//     password: 'phone098!'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log("Error! ", error)
// })




// const task=new Tasks({
//     description:" Watch 5 videos",
//     completed:true
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log("Error! ",error)
// })