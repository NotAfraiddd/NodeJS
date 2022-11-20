const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))


// HTTP logger
app.use(morgan('combined'))

// template engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'template'))

app.get('/',(req,res) =>{
    return res.render('Home')
})

app.listen(port,() => console.log('100%'))