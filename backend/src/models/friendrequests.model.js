import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const friendRequestsSchema = new mongoose.Schema(
    {

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true,

        },
        recipient:  {
            
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
             
        },
        status: {
            type: String,
            enum: ["pending", "accepted"],
            default: "pending"
        }

    }, 
    {timestamps: true}
)

const FriendRequest  = mongoose.model("FriendRequest", friendRequestsSchema)


export default FriendRequest