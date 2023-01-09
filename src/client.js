const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGO_DB_URL || 'mongodb+srv://uma_local:root@cluster0.0v7xi.mongodb.net/test';
let database;
// Database Name
const collectionName = 'user';

const dbConnection = async () => {
  if (database?.topology?.isConnected()) {
    console.log("Using existing database Connection")
    return Promise.resolve(database.db('db').collection(collectionName))
  }
  return new Promise(async (resolve, reject) => {
    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect((err, dbo) => {
      if (err) { return reject(err) }
      console.log("Connected successfully to Database!");
      const db = dbo.db('db').collection(collectionName);
      database = dbo;
      resolve(db)
    })
  })
}

module.exports = dbConnection;

