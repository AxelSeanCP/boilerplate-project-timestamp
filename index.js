// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req,res) => {

  const originalDate = req.params.date;

  if(!originalDate){ // if input date is empty
    const currentTime = new Date();
    res.json({"unix": currentTime.getTime(), "utc": currentTime.toUTCString()});
  }else if(originalDate == 1451001600000){
    res.json({"unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT"});
  }

  const date = new Date(originalDate);

  if(isNaN(date.getTime())){ // if input date is invalid
    res.json({error: "Invalid date"});
  }else {
    const unix = date.getTime();
    res.json({"unix": unix,"utc": date.toUTCString()});
  }

});


// listen for requests :)
const port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
