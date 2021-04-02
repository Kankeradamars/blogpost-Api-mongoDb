import { check, validationResult } from "express-validator";
import blogData from "../model/blogpostModel";
class Validator {
    static newAccountRules() {
        return [check("email", "yr email is not valid").isEmail(), 
        check("firstName", "please write yr firstName without special character").isAlpha(),
        check("lastName", "please write yr lastName without special character").isAlpha(),
        check("gender", "gender should be male or female").isIn(["male","female"]), 
        check("password","yr password must have 8 characters").isStrongPassword(),
        ]

    }
    static newSignInRules(){
        return [check("email","email is not valid").isEmail(),
    check("password","password must be strong").isStrongPassword(),]
    }

    static newBlogInRules(){
        return [check("title","title is required").isLength({min:10})],
        check('content', 'content must be there').isLength({ max: 200 })
    }

    static VerifyAccess = async (req,res,next)=>{
        const userIdFromToken =req.body.userId;
        const blogId =req.params.id;

        const blog =await blogData.findById(blogId);

        if(!blog){
            return res.status(404).json({
                status:404,
                error:"blog not exist"
            })
        }
        else if(userIdFromToken==blog.userId._id){
            return next();
        }
        return res.status(401).json({
            status:401,
            message:"you are not authorized"

})
    }

    static validateInput = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = errors.errors.map(e => e.msg);
            return res.status(400).json({
                status: 400,
                error: errorMessage
            })

        }
        return next()

    }
}


export default Validator;