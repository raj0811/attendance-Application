const mongoose = require('mongoose');

// mongoose.connect(process.env.DATABASE_URL)
mongoose.connect('mongodb://localhost/attendance_db');




//accuire the connectiontion
const db = mongoose.connection;


//error
db.on('error', console.error.bind(console, 'error in connecting to db'));

//up and runnning
db.once('open', function() {
    console.log("successfully connected to the database");
});