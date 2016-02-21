# Fun-Pipe

A module for piping together functions and applying them in order.

In the browser, the module is exported as `FunPipe`.

## Installation

### NPM

```
npm install --save fun-pipe
```

### Bower

```
bower install --save fun-pipe
```

## Examples

_See tests for more examples_

### NodeJS

```javascript
const funPipe = require('fun-pipe');

const f = (x) => x * x;
const g = (x) => x / 2;

let result = funPipe(4, f, g);
console.log(result)   // 8

// if the first argument is a function
// the pipe will be returned as a thunk
const pipe = funPipe(f, g);

result = pipe(4);
console.log(result)   // 8

// fun-pipe can also handle promises
const getPersonFromApi = (id) => {
  const persons = [{
    id: 1,
    name: 'Jane Smith',
    address: {
      city: 'Tierp'
    }
  }, {
    id: 2,
    name: 'Joe Smith',
    address: {
      city: 'Hedemora'
    }
  }];

  return Promise.resolve(persons.find((p) => p.id === id));
}
const selectCity = (entry) => entry.address.city;
const cityForPerson = funPipe(getPersonFromApi, selectCity);

cityForPerson(1)
  .then((result) => console.log(result));   // Tierp
```

### In the Browser

```javascript
// Works the same as in the NodeJS case, but is exported as `FunPipe`

function f(x) {
  return x * x;
}
function g(x) {
  return x / 2;
}

var result = FunPipe(4, f, g);
console.log(result)   // 8
```
