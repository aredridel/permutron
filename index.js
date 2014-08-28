var assert = require('assert');

module.exports = function permutron() {
    var args = Array.prototype.slice.apply(arguments);
    var donecb = args.pop();
    var iterator = args.pop();

    assert(typeof iterator == 'function');
    assert(typeof donecb == 'function');

    permute(args, function(pass, next) {
        setImmediate(function() {
            iterator.apply(null, pass.concat(next));
        });
    }, donecb);

};

function permute(args, iterator, donecb) {
    asyncEach(Array.isArray(args[0]) ? args[0] : [args[0]], function (cur, j, next) {
        if (args.length == 1) {
            iterator([cur], next);
        } else {
            permute(args.slice(1), function (further, next) {
                setImmediate(function() {
                    iterator([cur].concat(further), next);
                });
            }, next);
        }
    }, donecb);
}

function asyncEach(array, iterator, done) {
    var i = 0;
    function iterate() {
        if (i >= array.length) {
            return done();
        }

        setImmediate(function() {
            iterator(array[i], i++, iterate);
        });
    }

    iterate();
}

function zero() {
    return 0;
}
