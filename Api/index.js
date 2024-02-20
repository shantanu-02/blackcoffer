const express = require("express");
const { getCollection, disconnectFromMongoDB } = require("./mongoDB");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/intensity", cors(), async (req, res) => {
  try {
    const collection = await getCollection("assignment");
    const documents = await collection.find({}, { intensity: 1 }).toArray();
    const extractedField = documents.map((doc) => doc.intensity);

    res.json(documents);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/likelihood", cors(), async (req, res) => {
  try {
    const collection = await getCollection("assignment");
    const documents = await collection.find({}, { likelihood: 1 }).toArray();
    const extractedField = documents.map((doc) => doc.likelihood);

    res.json(extractedField);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/relevance", cors(), async (req, res) => {
  try {
    const collection = await getCollection("assignment");
    const documents = await collection.find({}, { relevance: 1 }).toArray();
    const extractedField = documents.map((doc) => doc.relevance);

    res.json(extractedField);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/topic", cors(), async (req, res) => {
  try {
    const collection = await getCollection("assignment");
    const documents = await collection.find({}, { topic: 1 }).toArray();
    const extractedField = documents.map((doc) => doc.topic);

    res.json(extractedField);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/country", cors(), async (req, res) => {
  try {
    const collection = await getCollection("assignment");
    const documents = await collection.find({}, { country: 1 }).toArray();
    const extractedField = documents.map((doc) => doc.country);

    res.json(extractedField);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/region/asia", cors(), async (req, res) => {
    const collection = await getCollection("assignment");
    const documents = await collection.find({ "region": {"$in": ["Western Asia", "Southern Asia", "Eastern Asia", "South-Eastern Asia" ]}}).toArray();

    res.json(documents);
  }
);

app.get("/region/america", cors(), async (req, res) => {
    const collection = await getCollection("assignment");
    const documents = await collection.find({ "region": {"$in": ["Northern America",  "Central America"]}}).toArray();
    
    res.json(documents);
  }
);

app.get("/region/europe", cors(), async (req, res) => {
    const collection = await getCollection("assignment");
    const documents = await collection.find({ region: {"$in": ["Eastern Europe", "Northern Europe", "Western Europe", "Europe" ]}}).toArray();
    
    res.json(documents);
  }
);

app.get("/region/world", cors(), async (req, res) => {
    const collection = await getCollection("assignment");
    const documents = await collection.find({ region: "World" }).toArray();
    
    res.json(documents);
  }
);

app.get("/region/africa", cors(), async (req, res) => {
  const collection = await getCollection("assignment");
  const documents = await collection.find({ region: {"$in": ["Central Africa", "Northern Africa", "Africa", "Southern Africa", "Western Africa" ]}}).toArray();
  
  res.json(documents);
}
);

app.get("/sector", cors(), async (req, res) => {
  try {
    const collection = await getCollection("assignment");
    const documents = await collection.find({}, { sector: 1 }).toArray();
    const extractedField = documents.map((doc) => doc.sector);

    res.json(extractedField);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/years", cors(), async (req, res) => {
  try {
    const collection = await getCollection("assignment");
    const documents = await collection.find({}, { projection: { start_year: 1, end_year: 1, sector: 1 } }).toArray();
    res.json(documents);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
