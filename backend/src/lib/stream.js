import {StreamChat} from 'stream-chat'
import "dotenv/config"


const apiKey  = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET


if(!apiKey || !apiSecret){
    console.error("Strean API key or Secret is missing")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret)


export const upsertStreamUser  = async (userData)=>{
    try { //upsert  = if dont exist then creat, and if exist then update
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.log("Error upserting stream User: ". error)
        
    }
}


//todo: do it later

export const generateStreanToken = (userId) =>{
    try {
        //ensure userId is a string
        const userIdStr= userId.toString()
        return streamClient.createToken(userIdStr)
    } catch (error) {
        console.log("Error in genrratig stream token: ", error)
        
    }
}
