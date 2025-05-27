import mongoose from "mongoose"
import "dotenv/config"


export const connectDB = async ()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MONGODB CONNECTED: ${conn.connection.host} `)
    } catch (error) {
        console.log("Error connection to MONGODB", error)
        process.exit(1); ///1 means failure

        
    }
}