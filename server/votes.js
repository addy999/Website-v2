const Database = require('better-sqlite3');
const moment = require('moment');
const VOTES_DB_PATH = '/var/data/votes.db';

function connect() {  
    return new Database(VOTES_DB_PATH, { verbose: console.log });
}

function create() {

    db = connect();
    db.prepare("CREATE TABLE votes (id int PRIMARY KEY, score int, dt varchar)").run();
    db.close();
}

function viewVote(id) {

    let db = connect();
    let res = db.prepare("SELECT * FROM votes WHERE id = ?").get(id);
    db.close();

    // console.log("Result", res);

    if (res) return [res.score, moment(res.dt)]
    else return [null, null]
}

function modifyScore(id, increase=true) {

    var [vote, dt] = viewVote(id);
    console.log("Modifying", vote, dt )
    var cmnd = "REPLACE";
    var now = moment().format();

    if (vote == null) {
        // console.log("adding new");
        vote = 0;
        cmnd = "INSERT";
    }

    if(increase){
        var new_vote = vote + 1;
        // console.log("Increased to ", new_vote);
    }
    else{
        var new_vote = vote - 1 >= 0 ? vote - 1 : 0;
        // console.log("Decreased to ", new_vote);
    }
    
    let db = connect();
    db.prepare(cmnd + " INTO votes VALUES (?,?,?)").run(id, new_vote, now);
    db.close();

    return new_vote
}

module.exports = {
    viewVote : viewVote,
    modifyScore : modifyScore
};