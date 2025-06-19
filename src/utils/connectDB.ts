import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}
const DBNAME = 'Hivve';

export async function CONNECTDB(): Promise<void> {
    if (connection.isConnected) {
        console.log('DB CON EXIST');
    } 

    try {
        const database = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
        connection.isConnected = database.connections[0].readyState;
        console.log('DB CONNECTED');
    } catch (error) {
        console.log('DB FAILED');
        process.exit(1);
    }
}