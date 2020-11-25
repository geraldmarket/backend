const MongoClient = require("mongodb").MongoClient;
const url ="mongodb://praveen:praveen@cluster0-shard-00-00.lgq23.mongodb.net:27017,cluster0-shard-00-01.lgq23.mongodb.net:27017,cluster0-shard-00-02.lgq23.mongodb.net:27017/Organic?ssl=true&replicaSet=atlas-bc8rzn-shard-0&authSource=admin&retryWrites=true&w=majority"
//const url = "mongodb://praveen1:praveen1@cluster0-shard-00-00-u7hhp.mongodb.net:27017,cluster0-shard-00-01-u7hhp.mongodb.net:27017,cluster0-shard-00-02-u7hhp.mongodb.net:27017/Organic?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
//const url = "mongodb://localhost:27017/Organic";
async function connect(callback) {
  await MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
    },
    async function (err, db) {
      mongodb = await db;
      if (mongodb) callback();
      else console.log("MongoDb not connected..!");
    }
  );
}
function get() {
  return mongodb;
}

function close() {
  mongodb.close();
}

module.exports = { connect, get, close };
