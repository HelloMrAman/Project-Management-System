import mongoose from 'mongoose';
import { getEnvVar } from '../../mode.js'; 

const connectDB = async () => {
  try {
    // Get the database URI from environment variables
    const dbURI = getEnvVar('DATABASE_URL');
    
    // Connect to MongoDB
    const connection = await mongoose.connect(dbURI);

    console.log(`MongoDB connected successfully: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

export default connectDB;
