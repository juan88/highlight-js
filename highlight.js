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
    
    //Initialize interval array
    for(var i = 0; i < total.length; i++) {
        replacements.push(false);
    }

    if(matches.length > 0) {
        for(var i = 0; i < matches.length; i++) {
            var end = matches[i] + part.length;
            for(var j = matches[i]; j < end; j++) {
                replacements[j] = true;
            }        
        }
    }

    return replacements;
}

intervals = function(part, total) {
    var intervals = [];
    var isInterval = false;
    var start,end = 0;
    var replacements = module.exports.replacements(part, total);

    for(var i = 0; i < total.length; i++) {
        if(!isInterval && replacements[i]) {
            start = i;
            isInterval = true;
        }

        if(isInterval && !replacements[i]) {
            end = i;
            isInterval = false;
            intervals.push({start:start, end:end});
        }
    }

    if(isInterval) {
    	intervals.push({start:start, end:total.length})
    }

    return intervals;
}


highlight = function(part, total, color) {
    var intervals = module.exports.intervals(part, total);

    var aux = total;
    for(var i = intervals.length-1; i >= 0; i--) {
    	var newContent = module.exports.tag('span', aux.slice(intervals[i].start, intervals[i].end), module.exports.style(color));
    	aux = module.exports.splice(aux, intervals[i].start, intervals[i].end, newContent);
    }

    return aux;
};

tag = function(tag, content, options = "") {
	if(options.length > 0) {
		options = " " + options;
	}
	return "<"+tag + options +">"+content+"</"+tag+">";
};

splice = function(str, start, end, add) {
	return str.slice(0, start).concat(add, str.slice(end));
};

style = function(color) {
	return "style=\"background-color: "+color+";\"";
};

module.exports = {
    matches:matches,
    intervals:intervals,
    replacements:replacements,
    highlight:highlight,
    style: style,
    tag: tag,
    splice: splice
};