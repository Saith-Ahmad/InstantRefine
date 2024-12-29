// import mongoose, { Mongoose } from 'mongoose';

// const MONGODB_URL = process.env.MONGO_URL;

// interface MongooseConnection {
//   conn: Mongoose | null;
//   promise: Promise<Mongoose> | null;
// }

// let cached: MongooseConnection = (global as any).mongoose

// if(!cached) {
//   cached = (global as any).mongoose = { 
//     conn: null, promise: null 
//   }
// }

// export const connectToDatabase = async () => {
//   if(cached.conn) return cached.conn;

//   if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

//   cached.promise = 
//     cached.promise || 
//     mongoose.connect(MONGODB_URL, { 
//       dbName: 'imaginify', bufferCommands: false 
//     })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }



import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase =async () =>{
    mongoose.set('strictQuery', true);
    if(!process.env.MONGO_URL){
        console.log("Mongodb url not found");
        return; 
    }
    if(isConnected){
        console.log("Mongodb url already connected");
        return; 
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("mongodb connection error", error)
    }
}