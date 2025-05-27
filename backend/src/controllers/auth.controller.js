import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { upsertStreamUser } from "../lib/stream.js"

export async function signup(req, res) {

   
    const {email, password, fullName} = req.body

    try {
        
        if(!email || !password || !(fullName && fullName.trim().length > 0)){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message: "User already exists with this email"})
        }

        const idx = Math.floor(Math.random()*100)+1 //creates a random number between 1 aand 100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`


        const newUser = await User.create({
            email, 
            fullName,
            password,
            profilePic: randomAvatar
        })

        //todo: Create the user in the stream



     try {
           await upsertStreamUser({
               id: newUser._id.toString(),
               name: newUser.fullName,
               Image: newUser.profilePic || "",
           })

           console.log(`Stream user created for ${newUser.fullName}`)
     } catch (error) {
        console.log("Error in creating Stream user in signup controller", error)
        
     }



        const token = jwt.sign(

            {userId: newUser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "7d"}

        )

        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true,// prevent XSS attacks
            sameSite: "strict",//prevent CSRF attacks
            secure: process.env.NODE_ENV === "production"
        })


        res.status(201).json({success:true, user:newUser})








    } catch (error) {
        console.log(`Error in signup controller`, error)
         res.status(500).json({message: "Internal Server Error"})
    }
    
}


export async function login(req, res) {

    const {email, password} = req.body
   
    try {

        if(!email || !password){
            return res.status(400).json({message: "All feilds are required"})
        }

        const user = await User.findOne({email})

        if(!user) return res.status(401).json({message: "Invalid email or password"})

        const isPasswordCorrect  = await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(401).json({message: 
            "Invalid email or password"
        })


        const token = jwt.sign(

            {userId: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "7d"}

        )

        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true,// prevent XSS attacks
            sameSite: "strict",//prevent CSRF attacks
            secure: process.env.NODE_ENV === "production"
        })


        res.status(200).json({success:true, user})






    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({message: "Internal server error"})
    }


	
}



export function logout(req, res) {
    
    res.clearCookie("jwt")
    res.status(200).json({success:true})


	
}



export async function onboard(req, res){
    try {
        const userId = req.user._id

        const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body

        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({
                message: "All fields are requiered",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            })
        }


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboarded: true
            },
            {new:true} //if not used then findidandupdate returns the user before updation
            //after using we get the updates user

        )

        if(!updatedUser) return res.status(404).json({message: "User not found"})

        //TODO: update the user in the stream
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || " "
            })
            console.log(`Stream user updated after onboarding for ${updatedUser}`)
        } catch (error) {
            console.log("Error upserting user in onboarding controller", error)
            res.status(500).json({message: "Internal Server Error"})
            
        }
        
        res.status(200).json({success:true, user: updatedUser})
    } catch (error) {
        console.log("Error in onboarding controller" , error)
        res.status(500).json({message: "Internal serevr error"})
    }

}