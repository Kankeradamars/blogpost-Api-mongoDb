import UserData from '../model/UserModel';
import { generateAuthToken } from '../Helpers/token';
import bcrypt from "bcrypt";
import EmailHelper from "../Helpers/emailTemplate"
import Response from '../Helpers/response';
class usercontroller {

    static changePassword = async (req, res) => {
        let {
            oldPassword,
            newPassword,
            confirmPassword
        } = req.body;
        const userId = req.body.userId;
        const userDetails = await UserData.findById(userId);  // at this stage userDetails used to catch all info about user

        if (bcrypt.compareSync(oldPassword, userDetails.password)) {
            if (newPassword === confirmPassword) {

                const password = bcrypt.hashSync(newPassword, 10);
                const passwordChangedTime = Date.now();
                const userUpdated = await UserData.findByIdAndUpdate(userId, {
                    password: password,
                    passwordChangedTime: passwordChangedTime
                });
                return Response.successMessage(res, "success",userUpdated, 200)
            }
            return Response.errorMessage(res,"new password is not the some as confirm", 417)
        }
        return Response.errorMessage(res,"old password provided is invalid", 417)
    }
    
    static signup = async (req, res) => {


        let {

            firstName,
            LastName,
            email,
            password,
            gender,
            role,
            address
        } = req.body;
        password = bcrypt.hashSync(password, 10);

        const isEmailExist = await UserData.findOne({ email: email })
        req.body.password = password;

        if (isEmailExist) {
            return Response.errorMessage(res, "email is duplicated", 409)
        }

        const data = await UserData.create(req.body);
        //create used to save data inside




        if (!data) {
            return Response.errorMessage(res, "signup failed", 417)

        }
        else {
            let { password, ...dataWithoutPassword } = data._doc;

            await EmailHelper.userWelcomeEmail(dataWithoutPassword);
            return Response.successMessage(res, "account created successfully", dataWithoutPassword, 201)

        }



    }
    static signin = async (req, res) => {
        let { email,
            password
        } = req.body;
        const isUserExist = await UserData.findOne({ email: email });
        //const isPasswordExist=bcrypt.compare(password,isUserExist.password);

        if (isUserExist && bcrypt.compareSync(password, isUserExist.password)) {
            const data = isUserExist;
            const token = generateAuthToken({
                id: data.id,
                email: data.email,
                role: data.role,
                passwordChangedTime: data.passwordChangedTime
            });
            let { password, ...dataWithoutPassword } = data._doc;

            return Response.successMessage(res, "login is  successfully", { token }, 201)

        }
        return Response.errorMessage(res, "user password incorrect", 409)
    }
}


export default { usercontroller }



