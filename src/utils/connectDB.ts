import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}
const DBNAME = 'Hivve';

export async function CONNECTDB(): Promise<void> {
    if (connection.isConnected) {
        console.log('DB CONN EXIST');
    } 

    try {
        const database = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
        connection.isConnected = database.connections[0].readyState;
        console.log('DB CONNECTED');
    } catch (e: unknown) {
        console.log('DB FAILED | Error: ', e);
        process.exit(1);
    }
}