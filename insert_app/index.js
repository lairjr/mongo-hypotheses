const mongoose = require('mongoose');

const oplogMongodb = 'mongodb1/test,mongodb2/test,mongodb3/test,mongodb4/test';

mongoose.connect(oplogMongodb, {
  poolSize: 10,
  socketOptions: { keepAlive: 250 },
}).then(() => {
  insertDoc();

  setInterval(insertDoc, 1000);
});

let index = 0;
const insertDoc = () => {
  index++;
  const result = mongoose.connection.db.collection('kittens').insert({ name: `cat ${index}` });
  result.then((writeResult) => {
    const name = writeResult.ops[0].name;
    console.log(`${name} inserted`);
  }).catch((err) => {
    console.log(err);
  })
}
