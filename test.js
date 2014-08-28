#!/usr/bin/env node

var test = require('tape');
var permutron = require('./');

test('Permute in least-significant-first (rightmost-first) order', function (t) {

    var results = [];
    permutron([1, 2], [3, 4], function (a, b, next) {
        results.push(a);
        results.push(b);
        next();
    }, function (err) {
        if (err) t.fail(err);
        t.ok(results.indexOf(4) < results.indexOf(2), "Iteration got to the highest value of the rightmost array before it got to the next value of the leftmost array");
        t.equal(results.length, 8);
        t.end();
    });

});

test('Permute supporting non-array arguments as single combinations', function (t) {

    var results = [];
    permutron('before', [1, 2], 'after', function (before, mid, after, next) {
        results.push([before, mid, after]);
        next();
    }, function (err) {
        if (err) t.fail(err);
        t.deepEqual(results[0], ['before', 1, 'after']);
        t.deepEqual(results[1], ['before', 2, 'after']);
        t.equal(results.length, 2);
        t.end();
    });

});
