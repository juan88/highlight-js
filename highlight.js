(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.highlight = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    
    function matches(part, total) {
        var regexp = new RegExp("(?=("+part+"))", "gi");
        var m, mm = [];

        while ((m = regexp.exec(total)) !== null) {
            if (m.index === regexp.lastIndex) {
                regexp.lastIndex++;
            }
            mm.push(m.index);
        }

        return mm;
    };

    function replacements(part, total) {
        var reps = [];
        mms = matches(part, total);
        
        //Initialize interval array
        for(var i = 0; i < total.length; i++) {
            reps.push(false);
        }

        if(mms.length > 0) {
            for(var i = 0; i < mms.length; i++) {
                var end = mms[i] + part.length;
                for(var j = mms[i]; j < end; j++) {
                    reps[j] = true;
                }        
            }
        }

        return reps;
    };

    function intervals(part, total) {
        var intervals = [];
        var isInterval = false;
        var start,end = 0;
        var reps = replacements(part, total);

        for(var i = 0; i < total.length; i++) {
            if(!isInterval && reps[i]) {
                start = i;
                isInterval = true;
            }

            if(isInterval && !reps[i]) {
                end = i;
                isInterval = false;
                intervals.push({start:start, end:end});
            }
        }

        if(isInterval) {
            intervals.push({start:start, end:total.length})
        }

        return intervals;
    };


    function highlight(part, total, color) {
        var elems = intervals(part, total);

        var aux = total;
        for(var i = elems.length-1; i >= 0; i--) {
            var newContent = tag('span', aux.slice(elems[i].start, elems[i].end), style(color));
            aux = splice(aux, elems[i].start, elems[i].end, newContent);
        }

        return aux;
    };

    function tag(tag, content, options = "") {
        if(options.length > 0) {
            options = " " + options;
        }
        return "<"+tag + options +">"+content+"</"+tag+">";
    };

    function splice(str, start, end, add) {
        return str.slice(0, start).concat(add, str.slice(end));
    };

    function style(color) {
        return "style=\"background-color: "+color+";\"";
    };

    return {
        highlight:highlight
    };
}));
