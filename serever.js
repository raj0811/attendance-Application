const express = require('express')
const port = 8000;
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const session = require('express-session');
const db = require('./db/mongoose')
const MongoStore = require('connect-mongo');
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  app.use(session({ 
    name: 'Attendance App',
    secret: 'your-secret-key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({

        mongoUrl: process.env.DATABASE_URL,
        autoRemove: 'disabled'

    },
    function(err){
        console.log(err || 'error in connect - mongodb setup ok');
    }
    )
}));



app.use('/api/v1',require('./routes'))

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
})