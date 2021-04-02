import UserData from '../model/UserModel';
import{generateAuthToken} from '../Helpers/token';
import bcrypt from "bcrypt";
class usercontroller{
static signup =async(req,res)=>{
    

let {
    
    firstName,
     LastName,
     email,
     password,
     gender,
     role,
     address
}=req.body;
password= bcrypt.hashSync(password,10);

const isEmailExist = await UserData.findOne({email:email})
req.body.password=password;

if (isEmailExist) {
    return res.status(409).json({
        status:409,
        error:"email is duplicated",
    })
}

const data = await UserData.create(req.body);
//create used to save data inside




if(!data){
    return res
    .status(417).json(
        {
           status:417,
           message:"signup failed",
           
        })
}
else{
    let{password,...dataWithoutPassword}=data._doc;
    return res.status(201).json(
        {
            status:201,
            message:"account created successfull",
            data:dataWithoutPassword
    
        }
    )
}



}
static signin =async (req,res)=>{
    let { email,
        password
    }=req.body;
    const isUserExist=await UserData.findOne({email:email});
    //const isPasswordExist=bcrypt.compare(password,isUserExist.password);
    
    if(isUserExist&& bcrypt.compareSync(password, isUserExist.password)){
        const data=isUserExist;
        const token= generateAuthToken({
           id:data.id,
           email:data.email,
           role:data.role
        });
        let{password,...dataWithoutPassword}=data._doc;
        
     return res.status(200).json({
        status:200,
        message:"login is  successfully",
        token:token,
        data:dataWithoutPassword
}     
     )
     
    }
    return res.status(404).json({
        status:404,
        message:"incorrect password"
    })

}
}


export default {usercontroller,UserData};



