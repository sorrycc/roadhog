require('bundle-loader?lazy&name=a!./a')((ret) => {
  console.log(`${ret} done`);
});
require('bundle-loader?lazy&name=b!./b')((ret) => {
  console.log(`${ret} done`);
});

console.log('index');
