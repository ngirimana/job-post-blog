const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const path = require('path');

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) },
));
app.set('view engine', 'handlebars',);

app.use(bodyParser.urlencoded({extended:false}))
// Body Parser
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//HandleBars



app.get('/',(req,res)=>res.render('index',{layout:'landing'}));
//Gigs routes
app.use('/gigs',require('./routes/gigs'));

const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT}`))


