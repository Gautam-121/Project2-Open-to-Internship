//----------------------------------------------Importing------------------------------------------------------

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const route = require('./route/route');
const { default: mongoose } = require('mongoose');
//-------------------------------------------------------------------------------------------------------------------

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://mehwish_777:mehwish786@cluster0.zi8zan2.mongodb.net/group-5?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

    .then(() => { console.log("Mongodb is connected") })
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});