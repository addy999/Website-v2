const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pino = require('express-pino-logger')();
const db = require('./db');
const moment = require('moment');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);

const DELAY = 1000; // ms

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/getVote', (req, res) => {
  const id = String(req.query.id);
  var [score, dt] = db.viewVote(id);
  if (score==null){
    // i.e. doesn't exist in db
    score = db.modifyScore(id); // Create a 0 score and add to db
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ score: `${score}` }));
})

app.get('/api/upVote', (req, res) => {

  const id = String(req.query.id);
  var now = moment().toDate().getTime();
  let [last_vote, last_vote_dt] = db.viewVote(id);
  let skip = false;

  if (last_vote_dt){
    last_vote_dt = last_vote_dt.toDate().getTime();
    if(now-last_vote_dt <= DELAY) skip = true;
  }

  if (skip) var score = last_vote;
  else var score = db.modifyScore(id, true);

  // if (skip) console.log("SKIPPING");
  // else console.log("fine");

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ score: `${score}` }));
})

app.get('/api/downVote', (req, res) => {
  const id = String(req.query.id);
  var score = db.modifyScore(id, false);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ score: `${score}` }));
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);