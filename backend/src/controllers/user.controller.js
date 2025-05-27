 
import User from "../models/user.model.js"
import FriendRequest from "../models/friendrequests.model.js"


export async function getReccomendedFriends(req, res) {

    try {
        const currentUserId = req.user.id 
        const currentUser = req.user

        const recommendedUsers = await User.find(
            {
                $and: [
                    {
                        _id: {$ne: currentUserId}
                    },//excludes current user

                    {
                        _id: {$nin: currentUser.friends}
                    },//excludes current user's friends

                    {
                        isOnboarded: true
                    }
                ]
            }
        )

        res.status(200).json(recommendedUsers)
    } catch (error) {
        console.error("Error in getReccomendedFriends controller", error)
        res.status(500).json({message: "Internal Server Error"})
        
    }


}



export async function getMyFriends(req, res){

    try {
        const user = await User.findById(req.user.id)
                     .select("friends")
                     .populate("friends", "fullName profilePic nativeLanguage learningLanguage")


                     res.status(200).json(user.friends)
    } catch (error) {
        console.error("Error in getMyFriends controller : ", error.message)
        res.status(500).json({message: "Internal Server error"})
        
    }

}



export async function sendFriendRequest(req, res){

    try {
        const myId  = req.user.id
        const {id:recipientId} = req.params

        //prevent sending req to yourself
        if(myId === recipientId){
            return res.status(400).json({message: "You cant send friend request to yourself"})

        }

        const recipient = await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message: "Recipient not found"})
        }

        //check if user is already friends
        if(recipient.friends.includes(myId)){
            return res.status("400").json({message: "You are already friends with this user"})
        }


        //check if request already exists
        const existingRequest = await FriendRequest.findOne(
            {
                $or: [
                    {sender: myId, recipient: recipientId},
                    {sender: recipientId, recipient: myId}
                ]
            }
        )

        if(existingRequest){
            return res.status(400).json({message: "A friend request already exists between you and this user"})
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })

        res.status(201).json(friendRequest)




    } catch (error) {
        console.error("Error in sendfriendRequest controller: ", error.message)
        res.status(500).json({message: "Internal Server Error"})
        
    }
}





export async function acceptFriendRequest(req, res){

    try {
        const {id:requestId} = req.params

        const friendRequest = await FriendRequest.findById(requestId)

        //check if the friend request exists in order for u to accept it
        if(!friendRequest){
            return res.status(404).json({message: "Friend request not found"})
        }

        //verify the current useris the recipient
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorised to accept this request"})

        }

        friendRequest.status = "accepted";
        await friendRequest.save()


        //add each user to the other's friend list
        //$addtoset: adds elements to an array only if they do not already exists
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {friends: friendRequest.recipient}
        })

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {friends: friendRequest.sender}
        })


        res.status(200).json({message: "Friend request accepted!!!"})


    } catch (error) {
        console.error("Error in acceptfriendrequest contorller", error.message)
        res.status(500).json({message: "Internal Server Error!!!!"})
    }


    
}





export async function getFriendRequests(req, res){
    try {
        const incomingRequests = await FriendRequest.find(
            {
                recipient: req.user.id,
                status:"pending"

            }
        ).populate("sender", "fullName profilePic nativeLanguage learningLanguage")

        const acceptedRequests = await FriendRequest.find(
            {
                sender: req.user.id,
                status: "accepted"
            }
        ).populate("recipient", "fullName profilePic")


        res.status(200).json({incomingRequests, acceptedRequests})
    } catch (error) {
        console.error("Error in getFriendRequest controlleer: ", error.message)
        res.status(500).json({message: "Internal Server Error!!!"})
        
    }
}



export async function getOutgoingFriendRequests(req,res){
    try {
        const outgoingRequests = await FriendRequest.find(
            {
                sender: req.user.id,
                status: "pending"
            }
        ).populate("recipient", "fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(outgoingRequests)
    } catch (error) {
       console.error("Error in outgoingRequest controlleer: ", error.message)
       res.status(500).json({message: "Internal Server Error!!!"})
        
        
    }
}