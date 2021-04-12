import { check, validationResult } from "express-validator";
import blogData from "../model/blogpostModel";
import Response from '../Helpers/response';
class Validator {
    static newAccountRules() {
        return [check("email", "yr email is not valid").isEmail(),
        check("firstName", "please write yr firstName without special character").isAlpha(),
        check("lastName", "please write yr lastName without special character").isAlpha(), // isAlpha i.e text no need of capital or numeric 
        check("gender", "gender should be male or female").isIn(["male", "female"]),
        check("password", "yr password must have 8 characters").isStrongPassword(),
        ]

    }
    static newSignInRules() {
        return [check("email", "email is not valid").isEmail(),
        check("password", "password must be strong").isStrongPassword(),]
    }

    static newBlogInRules() {
        return [check("title", "title is required").isLength({ min: 10 })],
            check('content', 'content must be there').isLength({ max: 200 })
    }

    static VerifyAccess = async (req, res, next) => {
        const userIdFromToken = req.body.userId;
        const blogId = req.params.id;

        const blog = await blogData.findById(blogId);

        if (!blog) {
            return Response.errorMessage(res, "blog not exist", 404)

        }
        else if (userIdFromToken == blog.userId._id) {
            return next();
        }
        return Response.errorMessage(res, "you are not authorized", 401)

    }

    static validateInput = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = errors.errors.map(e => e.msg);
            return Response.errorMessage(res, "errorMessage", 400)
        }
        return next()
        //this function setinze rules like firstname should be valid, 
        // validationResult(req) if there is an error , ex nib nta firstname nashyizemo kd iri required iyi 
        //input niy iduh error ya 400, iyo ari nta error ikor next function. 
    }
}


export default Validator;