matches = function(part, total) {
    var regexp = new RegExp("(?=("+part+"))", "gi");
    var m, mm = [];

    while ((m = regexp.exec(total)) !== null) {
        if (m.index === regexp.lastIndex) {
            regexp.lastIndex++;
        }
        mm.push(m.index);
    }

    return mm;
}

replacements = function(part, total) {
    var replacements = [];
    matches = module.exports.matches(part, total);
    for(var i = 0; i < matches.length; i++) {
        var start, end;
        start = matches[i];
        if(i+1 < matches.length) {
            if(matches[i] + part.length > matches[i+1]) {
                //Overlapping
                end = matches[i+1]+part.length;
            } else {
                end = matches[i]+part.length;
            }
        } else {
            end = matches[i]+part.length;
        }
        replacements.push({start:start, end:end});
    }

    return replacements;
}

joinIntervals = function(replacements) {
    if(replacements.length < 2) {
        return replacements;
    }

    for(var i = 0; i < replacements.length - 1; i++) {
            
    }
}


highlight = function(part, total, color) {
    var replacements = replacements(part, total);
};

module.exports = {
    matches:matches,
    replacements:replacements,
    highlight:highlight,
    joinIntervals: joinIntervals,
};