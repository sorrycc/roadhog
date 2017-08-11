
// import(/* webpackChunkName: 'a' */'./a').then(() => {
//   console.log('a done');
// });

// import(/* webpackChunkName: 'b' */'./b').then(() => {
//   console.log('b done');
// });

// Promise.all([
//   import(/* webpackChunkName: 'a' */'./a'),
//   import(/* webpackChunkName: 'b' */'./b')
// ]).then(([a, b]) => {
//   console.log(`all done: ${a}, ${b}`);
// });

require('bundle-loader?lazy&name=a!./a')((ret) => {
  console.log(`${ret} done`);
});
require('bundle-loader?lazy&name=b!./b')((ret) => {
  console.log(`${ret} done`);
});

console.log('index');
