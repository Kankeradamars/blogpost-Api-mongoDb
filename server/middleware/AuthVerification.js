import{dataFromToken}  from '../Helpers/token.js';
import usercontroller from '../controller/AuthController';
 export const verifyAuth=async (req,res,next)=>{
     const token=req.header("x-auth-token");


     if(!token){
        return res.status(404).json(
            {
               status:404,
               message:"no token found",
               
            })
    }
    try {
       
        const blog=dataFromToken(token).payload;
     const user=usercontroller.UserData;
     const data= user.findOne({email :user.email});
     //const data = await  blogData.findOne({email:email})
     if (!data){
         return res.status(404).json({
         status:404,
         message: "you are not a user"
         })
        
        
}
     req.body.userId=blog.id
     console.log(blog.id);
     return next() 
    } catch(e){
        console.log(e)
         res.status(404).json({
            status:404,
            message: "token is not valid"
            })
    }
     
     
 }