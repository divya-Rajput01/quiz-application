import { MongoClient } from 'mongodb'
const dbname = 'quizdb'
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
async function dbConnection(){
    await client.connect()
    const db = client.db(dbname)
    return db;
    // const collection = db.collection('users')
    // const result = await collection.find().toArray()
    // console.log("this is an array",result)
}

export default dbConnection;


