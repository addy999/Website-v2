const Database = require('better-sqlite3');
const moment = require('moment');
const COMMENTS_DB_PATH = './var/data/comments.db';

function connect() {  
    return new Database(COMMENTS_DB_PATH, { verbose: console.log });
}

function create() {

    db = connect();
    db.prepare("CREATE TABLE comments (id int, comment varchar, dt DOUBLE)").run();
    db.close();
}

function getComments(id) {

    let db = connect();
    let res = db.prepare("SELECT * FROM comments WHERE id = ?").all(id);
    db.close();

    return res
}

function addComment(id, comment) {

    let now = moment().unix();
    let db = connect();
    db.prepare("INSERT INTO comments VALUES (?,?,?)").run(id, comment, now);
    db.close();

}

module.exports = {
    getComments : getComments,
    addComment : addComment,
};


// connect();
// create();
// addComment(1, "This is the BEST!")
// console.log(getComments(0));
