import ratelimit from "../config/upstash.js";


const rateLimiter=async (req,res,next)=>{

    try {
        const {success,reset}=await ratelimit.limit("my-limit-key");
        const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
        if(!success){
           return res.status(429).json({
                message:`Too many requests try after ${retryAfterSeconds}`
            });
        }
        next();
        
    } catch (error) {
        console.log("Rate limit error",error);
        next(error);
    }
}
export default rateLimiter