# Mongo hypotheses

We believe mongoose promisses resolution are triggered only when data is persisted

Will result in a trusted data managent using the promisse resolution function

We will have confidence to proceed when have promisses resolution working properly even if one of the mongo instances dies.

### Set up test

1. You should start mongos by doing: `docker-compose up mongodb1 mongodb2 mongodb3 mongodb4`;
2. Configure mongo replicat set doing: `docker-compose up mongoConfigRs0`;
3. If you want to tail the oplogs you can do: `docker-compose up oplog1 oplog2 oplog3 oplog4`;
4. Then you can run a sample app by: `docker-compose up insert_app`.

### Experiment with app dying

In order to prove promise resolution we built an app which will ask to insert an kitten in the kittens mongo collection and the app will exit right after the request.

### Results

We were able to conclude that mongoose promise resolution is not triggered and the data is not persisted.
![with_app_dying](https://user-images.githubusercontent.com/9889113/27057048-cc4f101e-4fa0-11e7-8267-805389cd3a5e.gif)
