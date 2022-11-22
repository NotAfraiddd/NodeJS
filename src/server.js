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
app.set('views',path.join(__dirname,'resources/views'))

app.get('/',(req,res) =>{
    res.render('home')
})

app.get('/news',(req,res) =>{
    res.render('news')
})

app.get('/search', (req, res) => {
    res.render('search');
});

app.post('/search', (req, res) => {
    res.send('');
});

app.listen(port,() => console.log('100%'))