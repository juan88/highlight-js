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
test("Check replacements #1", () => {
    expect(replacements("XX", "AAXXAAXXXAAAA")).toEqual([{start:2, end:4}, {start:6, end:9}]);
});

test("Check replacements #2", () => {
    expect(replacements("XXX", "XXX")).toEqual([{start:0, end:3}]);
});

test("Check replacements #3", () => {
    expect(replacements("XXX", "XXXAAAXXX")).toEqual([{start:0, end:3}, {start:6, end:9}]);
});

test("Check replacements #4", () => {
    expect(replacements("XXX", "XXXAAAXX")).toEqual([{start:0, end:3}]);
});

test("Check replacements #5", () => {
    expect(replacements("XX", "XXXAAAXX")).toEqual([{start:0, end:3}, {start: 6, end: 8}]);
});

test("Check replacements #6", () => {
    expect(replacements("XX", "XXXXX")).toEqual([{start: 0, end: 6}]);
});