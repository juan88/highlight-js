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
    if(matches.length > 0) {
        var interval = {start:matches[0], end:matches[0]+part.length};
        
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
            replacements.push(interval);
        }
    }

    return replacements;
}

extendInterval = function(interval, newStart, newEnd) {
    if(interval.start <= newStart && newStart <= interval.end) {
        return [{start:interval.start, end:Math.max(interval.end, newEnd)}];
    }

    if(interval.start <= newEnd && newEnd <= interval.end) {
        return [{start: Math.min(newStart, interval.start), end: interval.end}];
    }

    return [interval, {start:newStart, end:newEnd}];
}


highlight = function(part, total, color) {
    var replacements = replacements(part, total);
};

module.exports = {
    matches:matches,
    replacements:replacements,
    highlight:highlight,
    extendInterval: extendInterval,
};