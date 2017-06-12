const mongoose = require('mongoose');

const oplogMongodbUri = process.env.OPLOG_URI ? process.env.OPLOG_URI : 'mongodb1/local';

const shouldStream = (data) => {
  return data.ns !== '';
};

const onData = (data) => {
  if (shouldStream(data)) {
    const topic = 'kittens';

    console.log(data);
  }
};

const onConnect = () => {
  const options = {
    tailable: true,
    awaitdata: true
  };

  const stream = mongoose.connection.db.collection('oplog.rs').find({}, options);

  stream.on('data', onData)
        .on('error', (err) => console.log(err))
        .on('close', () => console.log('close'));
};

mongoose.connect(oplogMongodbUri, {
      poolSize: 10,
      socketOptions: { keepAlive: 250 },
    }).then(onConnect)
      .catch((err) => console.log(err));
