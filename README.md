# Mongo hypotheses

We believe mongoose promisses resolution are triggered only when data is persisted

Will result in a trusted data managent using the promisse resolution function

We will have confidence to proceed when have promisses resolution working properly even if one of the mongo instances dies.

### Set up test

1. You should start mongos by doing: `docker-compose up mongodb1 mongodb2 mongodb3 mongodb4`;
2. Configure mongo replicat set doing: `docker-compose up mongoConfigRs0`;
3. If you want to tail the oplogs you can do: `docker-compose up oplog1 oplog2 oplog3 oplog4`;
4. Then you can run a sample app by: `docker-compose up insert_app`.

### Experiment

In order to prove promise resolution we built an app which insert recurrent kittens by 1 sec interval and we try to kill the primary mongo instance. We should have a delay to resolve promises until mongo selects a new primary instance, but we should keep the inserted data consistence.

### Results

We were able to conclude that mongoose promise resolution are triggered only if the data it's actually persisted.
![mongo_sample](https://user-images.githubusercontent.com/9889113/27053916-79decd84-4f95-11e7-98c2-16bd54e61d12.gif)
