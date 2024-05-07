import { MongoClient, ObjectId } from "mongodb";
import { startFunc as startFuncForPassword } from "../commonFuncs/forPassword.js";
// const { ObjectId } = require('mongodb');

import configJson from '../../../Config.json' assert {type: 'json'};

let StartFunc = async ({ inId }) => {
    try {

        const password = startFuncForPassword();

        let url = configJson.mongoDbConfig.url;
        const dbName = configJson.mongoDbConfig.DbName;
        const LocalcollectionName = configJson.mongoDbConfig.collectionName;

        url = url.replace("<password>", password);

        const client = new MongoClient(url);

        await client.connect();
        // console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(LocalcollectionName);
        // let objID = new ObjectId(inId);
        console.log('inId : ', inId);
        const insertResult = await collection.deleteOne( { _id: new ObjectId(inId) } );
        // let serverData = await collection.find().toArray();
        // console.log('serverData successfully to server', serverData);
        return await insertResult;
    } catch (error) {
        console.log("error : ", error);
        return await {
            KTF: false,
            KReason: { ErrorFrom: process.cwd(), sequelizeError: error },
        };
    };
};

export { StartFunc };