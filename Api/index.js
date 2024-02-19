const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blackcoffer';

app.get('/data', async (req, res) => {
  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('assignment');

    const documents = await collection.find({}).toArray();

    await client.close();

    res.json(documents);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(8000, () => {
  console.log(`Server is running`);
});