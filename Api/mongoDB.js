const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'blackcoffer';

let client;

async function connectToMongoDB() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
}

async function disconnectFromMongoDB() {
  if (client) {
    await client.close();
    client = undefined;
  }
}

async function getCollection(collectionName) {
  await connectToMongoDB();
  const db = client.db(dbName);
  return db.collection(collectionName);
}

module.exports = {
  connectToMongoDB,
  disconnectFromMongoDB,
  getCollection,
};
