const express = require('express');
const path = require('path');
const env = require('dotenv');
const Twitter = require('twitter');
const bodyParser = require('body-parser'); 
env.config();
const app = express();

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key : process.env.ACCESS_TOKEN_KEY,
    access_token_secret : process.env.ACCESS_TOKEN_SECRET
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Uncomment for production
app.use(express.static(path.join(__dirname +'/../dist/heroku-test-app')));

app.get('/search',function (req,res) {
    // res.send('Hello World');
    // res.json({
    //     text:'hello',
    //     body:'world'
    // });

    // const {tags, count, type} = req.body;
    // res.send(req.query.q);
    const tags =  req.query.tags;
    const count =  req.query.count;
    const type =  req.query.type;
    let values = [];

    client.get('search/tweets', {q: tags, count:count, result_type:type, tweet_mode:'extended'}, function(error, tweets, response) {
        values = tweets['statuses'].map( tweet => {
            return  {
                id:tweet.id,
                created_at : tweet.created_at,
                full_text : tweet.full_text,
                retweets : tweet.retweet_count,
                favorites : tweet.favorite_count
                // hashtags : tweet.entities.hashtags,
            }
    // //     // res.json(tweets);
        });
        res.json(values);    
     });
});

app.get('/' ,function(req,res) {
    res.sendFile('index.html');
});
app.listen(process.env.PORT || 8080 , () => {
    console.log("Running on 8080");
});



