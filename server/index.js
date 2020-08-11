const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pino = require('express-pino-logger')();
const votes = require('./votes');
const comment_db = require('./comments');
const moment = require('moment');

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

const DELAY = 1000; // ms

// Vote API

app.get('/api/getVote', (req, res) => {
  const id = String(req.query.id);
  var [score, dt] = votes.viewVote(id);
  if (score==null){
    // i.e. doesn't exist in votes
    score = votes.modifyScore(id); // Create a 0 score and add to votes
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ score: `${score}` }));
})

app.get('/api/upVote', (req, res) => {

  const id = String(req.query.id);
  var now = moment().toDate().getTime();
  let [last_vote, last_vote_dt] = votes.viewVote(id);
  let skip = false;

  if (last_vote_dt){
    last_vote_dt = last_vote_dt.toDate().getTime();
    if(now-last_vote_dt <= DELAY) skip = true;
  }

  if (skip) var score = last_vote;
  else var score = votes.modifyScore(id, true);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ score: `${score}` }));
})

// Comment API

function parseComments(comments) {
  return comments.reduce((acc, row) => {
    acc[row.dt] = String(row.comment);
    return acc;
  }, {});
}

app.get('/api/getComments', (req, res) => {

  const id = String(req.query.id);
  const comments = comment_db.getComments(id);
  
  res.setHeader('Content-Type', 'application/json');
  res.send(parseComments(comments));
})

app.post('/api/submitComment', (req, res) => {

  const id = String(req.body.id);
  const comment = String(req.body.comment);

  comment_db.addComment(id, comment);
  let send_back = parseComments(comment_db.getComments(id));
  
  // Send refreshed comments back
  res.setHeader('Content-Type', 'application/json');
  res.send(send_back);
})


// Start server

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