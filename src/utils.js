function objEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function sortComments(cmnts) {
    
    var ordered = {};
    if (this.objEmpty(cmnts)) return null

    Object.keys(cmnts).sort().forEach(function(key) {
        ordered[key] = cmnts[key];
    });
    return ordered;
}

module.exports = {
    sortComments: sortComments,
    objEmpty : this.objEmpty
}