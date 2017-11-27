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


//Replacements
test("Check Replacements #1", () => {
    expect(replacements("XX", "AAXXAA")).toEqual([false, false, true, true, false, false]);
});


test("Check Replacements #2", () => {
    expect(replacements("XXX", "XXX")).toEqual([true, true, true]);
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
    expect(intervals("XX", "XXXXX")).toEqual([{start: 0, end: 6}]);
});
