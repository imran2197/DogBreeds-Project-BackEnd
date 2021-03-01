const mongoose = require('mongoose');
const cors = require('cors');
const app = require('./app');
app.use(cors());

mongoose.connect("mongodb+srv://<samimdimran786>:<@farahramsha1234>@dogbreeds.atvc0.mongodb.net/dogbreeds?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

console.log("Database is connected");

app.listen(process.env.PORT);