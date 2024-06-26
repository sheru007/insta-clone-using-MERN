const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 6000;
const { MONGOURI } = require('./config/keys')



mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', function() {
    console.log('connected to mongo yehh!!')
})
mongoose.connection.on('error', function(err){
    console.log('err connecting.. ', err)
})

require('./models/user')
require('./models/post')


app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})