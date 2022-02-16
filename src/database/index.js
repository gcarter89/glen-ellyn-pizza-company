import mongodb from 'mongodb';
import { config } from 'dotenv';

export default async function makeDb() {
    try {
        config()
        const MongoClient = mongodb.MongoClient;
        const uri = process.env.DATABASE;
        const dbName = process.env.DBNAME;
        
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
        await client.connect();
        const db = await client.db(dbName);
        db.makeId = makeIdFromString;
        return db;
    } catch (err) {
        console.error(err);
    }
}

function makeIdFromString(id) {
    return new mongodb.ObjectId(id);
}

console.log(makeDb())