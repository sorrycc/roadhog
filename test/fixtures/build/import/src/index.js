Promise.all([
  import(/* webpackChunkName: 'a' */'./a'),
  import(/* webpackChunkName: 'b' */'./b')
]).then(([a, b]) => {
  console.log(`all done: ${a}, ${b}`);
});

console.log('index');
