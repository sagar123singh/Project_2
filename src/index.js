const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer')

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://sagar123singh:ds@cluster0.oye0t.mongodb.net/group26Database?authSource=admin&replicaSet=atlas-gyucxl-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true
    
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

    
app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});