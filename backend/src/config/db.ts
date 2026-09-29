import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async (): Promise<boolean> => {
  if (isConnected) {
    return true;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wareiq_demo';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`[MongoDB] Successfully connected to: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error: any) {
    console.warn(`[MongoDB] Connection notice: ${error.message}.`);
    console.info(`[MongoDB] Running in offline demo mode / memory mock fallback for development if database is unreachable.`);
    return false;
  }
};

export const getDBStatus = (): { connected: boolean; host?: string; database?: string } => {
  const readyState = mongoose.connection.readyState;
  return {
    connected: readyState === 1,
    host: readyState === 1 ? mongoose.connection.host : undefined,
    database: readyState === 1 ? mongoose.connection.name : undefined,
  };
};
