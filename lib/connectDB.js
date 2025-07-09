// import mongoose from "mongoose";
// import dotenv from "dotenv";


// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI;
// if (!MONGODB_URI){
//     throw new Error('Mongodb url is not defiled in .env file');
// }

// const connectDB = async () => {
//     try{
//         if (mongoose.connection.readyState === 1){
//             console.log('MongoDB is already connected');
//             return;
//         }
//         await mongoose.connect(MONGODB_URI)
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error('MongoDB connection failed:', error.message);
//         process.exit(1); // Exit the process with failure
//     }

// };

// export default connectDB;