const sum = require('./highlight');

//Matches
test("check matches for regexp #1", () => {
    expect(matches("AAXXA", "AAXXAAXXXAAAA")).toEqual([0]);
});

test("check matches for regexp #2", () => {
    expect(matches("AAXXAAXXXAAAA", "AAXXAAXXXAAAA")).toEqual([0]);
});

test("check matches for regexp #3", () => {
    expect(matches("AA", "AAXXAAXXXAAAA")).toEqual([0,4,9,10,11]);
});

test("check matches for regexp #4", () => {
    expect(matches("XX", "AAXXAAXXXAAAA")).toEqual([2, 6, 7]);
});

test("check matches for regexp #5", () => {
    expect(matches("XXX", "XXX")).toEqual([0]);
});

test("Length", () => {
    expect("XXX".length).toEqual(3);
});

//Replacements
test("Check Replacements #1", () => {
    expect(replacements("XX", "AAXXAA")).toEqual([false, false, true, true, false, false]);
});


test("Check Replacements #2", () => {
    expect(replacements("XXX", "XXX")).toEqual([true, true, true]);
});

test("Check Replacements #3", () => {
    expect(replacements("XX", "XXXAAAXX")).toEqual([true, true, true, false, false, false, true, true]);
});

//Intervals
test("Check intervals #1", () => {
    expect(intervals("XX", "AAXXAAXXXAAAA")).toEqual([{start:2, end:4}, {start:6, end:9}]);
});

test("Check intervals #2", () => {
    expect(intervals("XXX", "XXX")).toEqual([{start:0, end:3}]);
});

test("Check intervals #3", () => {
    expect(intervals("XXX", "XXXAAAXXX")).toEqual([{start:0, end:3}, {start:6, end:9}]);
});

test("Check intervals #4", () => {
    expect(intervals("XXX", "XXXAAAXX")).toEqual([{start:0, end:3}]);
});

test("Check intervals #5", () => {
    expect(intervals("XX", "XXXAAAXX")).toEqual([{start:0, end:3}, {start: 6, end: 8}]);
});

test("Check intervals #6", () => {
    expect(intervals("XX", "XXXXX")).toEqual([{start: 0, end: 5}]);
});

//Color
test("Color", () => {
    expect(style("#FEFEFE")).toEqual("style=\"background-color: #FEFEFE;\"");
});

//Splice
test("Splice #1", () => {
    expect(splice("AAAAAXAAA", 5, 6, 'Y')).toEqual("AAAAAYAAA");
});

test("Splice #2", () => {
    expect(splice("AAAAAXAAZ", 8, 9, 'X')).toEqual("AAAAAXAAX");
});

test("Splice #3", () => {
    expect(splice("AAAAAXAAZ", 8, 9, 'XXX')).toEqual("AAAAAXAAXXX");
});

test("Splice #4", () => {
    expect(splice("A", 0, 1, 'XXX')).toEqual("XXX");
});

test("Splice #5", () => {
    expect(splice("AZ", 0, 1, 'XXX')).toEqual("XXXZ");
});

//Tag
test("Check tag #1", () => {
    expect(tag("span", "foo", "style=\"background-color: #FEFEFE;\"")).toEqual("<span style=\"background-color: #FEFEFE;\">foo</span>");
});

test("Check tag #2", () => {
    expect(tag("span", "foo")).toEqual("<span>foo</span>");
});

//Highlight
test("Check highlight #1", () => {
    expect(highlight("XX", "AAXXAAXXXAAAA", "#F0F011")).toEqual("AA<span style=\"background-color: #F0F011;\">XX</span>AA<span style=\"background-color: #F0F011;\">XXX</span>AAAA");
});

test("Check highlight #2", () => {
    expect(highlight("XXX", "XXX", "#FEFEFE")).toEqual("<span style=\"background-color: #FEFEFE;\">XXX</span>");
});

test("Check highlight #3", () => {
    expect(highlight("XXX", "XXXAAAXX", "#FEFEFE")).toEqual("<span style=\"background-color: #FEFEFE;\">XXX</span>AAAXX");
});

test("Check highlight #4", () => {
    expect(highlight("XX", "XXXAAAXX", "#FEFEFE")).toEqual("<span style=\"background-color: #FEFEFE;\">XXX</span>AAA<span style=\"background-color: #FEFEFE;\">XX</span>");
});