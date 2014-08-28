# Permutron

Asynchronously iterate permutations of function arguments

## Synopsis

```
var permutron = require('permutron');
```

```
permutron('static', ['permutable'], 'static', ['permutable'], function (a, b, c, d, next) { }, done);
```

```
permutron.raw(['static', ['permutable'], 'static', ['permutable']], function(row, next) { }, done);
```

## Description

Permutron simply iterates over each argument, giving one permutation each time.

Arguments that are arrays are used as sources of permutations, other arguments are passed along statically.

## Example

```
var permutron = require('permutron');

permutron('static1', ['dynamic1', 'dynamic2'], ['dynamic3', 'dynamic4'], 'static2', function (a, b, c, d, next()) {
    console.log(a, b, c, d);
    next();
}, function (err) {
    console.log('done!');
});
```

Will output:

```
static1 dynamic1 dynamic3 static2
static1 dynamic1 dynamic4 static2
static1 dynamic2 dynamic3 static2
static1 dynamic2 dynamic4 static2
done!
```
