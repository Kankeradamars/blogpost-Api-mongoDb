import{dataFromToken}  from '../Helpers/token.js';
import usercontroller from '../controller/AuthController';
import UserData from '../model/UserModel';
import Response  from '../Helpers/response';
 export const verifyAuth=async (req,res,next)=>{
     const token=req.header("x-auth-token");


     if(!token){
        return Response.errorMessage(res, "no token found", 404)
        
    }
    try {
       
        const user=dataFromToken(token).payload;
     //const user=usercontroller.UserData;
     const data=await UserData.findById(user.id);
     //const data = await  blogData.findOne({email:email})
     if (!data){
      return Response.errorMessage(res, "you are not a user", 404)
         
        
        
}

if(user.passwordChangedTime!=data.passwordChangedTime){
   return Response.errorMessage(res,"plz re-login yr account by  using new password", 417) // here token is expired, we need to pass new password in signin for generating a new token can be used in change password.
}
     req.body.userId=user.id
     console.log(user.id);
     return next() 
    } catch(e){
        console.log(e)
        return Response.errorMessage(res, "token is not valid", 404)
         
    }
     
     
 }