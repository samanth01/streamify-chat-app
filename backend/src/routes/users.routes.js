import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getReccomendedFriends, sendFriendRequest } from "../controllers/user.controller.js"
 
const router = express.Router()


//middleware applies to each of the route
router.use(protectRoute)

router.get('/', getReccomendedFriends)
router.get("/friends", getMyFriends )


router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)

router.get("/friend-requests", getFriendRequests)
router.get("/outgoing-friend-requests", getOutgoingFriendRequests)

export default router