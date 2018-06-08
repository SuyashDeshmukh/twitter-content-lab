const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname +'/../dist/heroku-test-app')));

app.get('/' ,function(req,res) {
    res.sendFile(express.static(path.join(__dirname + '/../dist/heroku-test-app/index.html')));
});
app.listen(process.env.PORT || 8080);


