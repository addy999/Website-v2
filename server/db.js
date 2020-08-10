const Database = require('better-sqlite3');
const DB_PATH = './votes.db';

function connect() {  
    return new Database(DB_PATH, { verbose: console.log });
}

function create() {

    db = connect();
    db.prepare("CREATE TABLE votes (id int PRIMARY KEY, score int)").run();
    db.close();
}

function viewVote(id) {

    let db = connect();
    let res = db.prepare("SELECT * FROM votes WHERE id = ?").get(id);
    db.close();

    // console.log("Result", res);

    if (res) return res.score
    else return null
}

function modifyScore(id, increase=true) {

    var vote = viewVote(id);
    var cmnd = "REPLACE";

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
    db.prepare(cmnd + " INTO votes VALUES (?,?)").run(id, new_vote);
    db.close();

    return new_vote
}

module.exports = {
    viewVote : viewVote,
    modifyScore : modifyScore
};

// create();

// console.log("modifying");
// modifyScore(0, true);
// console.log("Now", viewVote(0));

// console.log("View...")
// console.log(viewVote(0));
// console.log(viewVote(1));
// console.log(viewVote(2));