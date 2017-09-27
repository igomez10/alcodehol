var express = require('express');
var app = express();
var _ = require('underscore')
var bodyParser = require('body-parser')
var btoa = require('btoa')

var jsonParser = bodyParser.json()

app.use(express.static('dist'))


teams = {}

judgesID = ['ignacio']

scriptsToSee = []

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html')
})

app.get('/dist/static/:algo', function(req, res){
  res.sendFile(__dirname + '/dist/static/' + req.params.algo)
})


app.get('/assets/:something', function(req, res){
  res.sendFile(__dirname + '/assets/' + req.params.something);
});

// GET SCORE OF A TEAM
app.get('/score/:teamName', function(req, res){
  console.log('GET /SCORE/TEAMNAME')
  res.send(" " + teams[req.params.teamName])
});

// ADD NEW TEAM TO THE OBJECT CONTAINING ALL THE TEAMS
app.post('/newTeam/:name', function(req, res){
  const teamName = req.params.name
  if (teams[teamName] == undefined ) {
    teams[req.params.name] = 0
    console.log('New Team: ' + req.params.name)
    res.send('SUCCESS' +  JSON.stringify(teams))
    return
  }
  res.send('INVALID NAME')
});

// ADD +1 TO THE SCORE OF A TEAM
app.post('/judge/:judgeID/:teamName', function(req, res){
  if (_.contains(judgesID , req.params.judgeID) && teams[req.params.teamName] != undefined) {
    teams[req.params.teamName]++
    res.send('SUCCESS' + JSON.stringify(teams))
  }
  res.send('WRONG JUDGEID OR NOT A VALID TEAM')
});

// PUSHES THE NEW SCRIPT TO THE LIST OF OLD SCRIPTS TO CHECK
app.post('/solution/:teamName', function(req, res){
  const teamName = req.params.teamName
  if (teams.teamName != undefined && req.body.script != undefined ){
    theScript = btoa( req.body.script )
    scriptsToSee.push( [req.params.teamName , theScript ])
    console.log('RECEIVED SCRIPT FROM ' + req.params.teamName)
    res.send('SUCCESS' +  JSON.stringify(teams))
  }
  console.log('ERROR, WRONG TEAMNAME OR INVALID BODY')
  res.send('ERROR ')
})

app.listen(1212, function () {
  console.log('Listening on port 1212')
})
