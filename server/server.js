const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname +'/../dist/heroku-test-app')));

app.get('/' ,function(req,res) {
    res.sendFile('index.html');
});
app.listen(process.env.PORT || 8080);


