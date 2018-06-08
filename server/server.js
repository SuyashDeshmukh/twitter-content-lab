const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname +'/../dist')));
app.get('/' ,function(req,res) {
    res.send(200);
});
app.listen(process.env.PORT || 8080);


