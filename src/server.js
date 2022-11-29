const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const methodOverride = require('method-override')

const route = require('./routes')

app.use(express.static(path.join(__dirname, 'public')))


app.use(express.urlencoded({
    extended: true
}))
// urlencoded(), xử lí dạng form
app.use(express.json())
app.use(methodOverride('_method'))

// json() xử lí từ js đưa lên

// HTTP logger
// app.use(morgan('combined'))

// template engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        sum: (a, b) => a + b,
    },
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app)
const db = require('./config/db')

//Connect to DB
db.connect();


app.listen(port, () => console.log('100%'))