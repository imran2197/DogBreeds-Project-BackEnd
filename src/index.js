const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect("mongodb://localhost:27017/DogBreeds", {useNewUrlParser: true, useUnifiedTopology: true});

console.log("Database is connected");

app.listen(9999, console.log("listening on port " +9999));