const dbConnection = require('../client');
const ObjectID = require('mongodb').ObjectID;

const getUser = async (id, res) => {
  try {
    const collection = await dbConnection();
    const result = await collection.findOne({ _id: ObjectID(id) });
    res.json(result ? result : "No record found");
  } catch (error) {
    console.warn("ERROR: " + error);
    res.status(err?.statusCode || 500).json({ error: error.message });
  }
}

const createUser = async (id, doc, res) => {
  try {
    const collection = await dbConnection();
    if (id) {
      const options = { upsert: true, returnOriginal: false, returnDocument: "after" };
      delete doc["_id"];
      const result = await collection.findOneAndUpdate({ _id: ObjectID(id) }, { $set: doc }, options);
      res.json(result.value);
    } else {
      const result = await collection.insertOne(doc);
      doc["_id"] = result.insertedId;
      res.json(doc);
    }
  } catch (error) {
    console.warn("ERROR: " + error);
    res.status(err?.statusCode || 500).json({ error: err.message });
  }
}

module.exports = { getUser, createUser }