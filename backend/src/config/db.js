import mongoose from "mongoose";

export const connectDB= async()=>{
   try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MONGODB CONNECTION SUCCESSFUL...");
    
   } catch (error) {
      console.log("ERROR IN CONNECTING MONGODB..."+error);
      process.exit(1);
   }
};