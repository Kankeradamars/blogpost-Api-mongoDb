import express from 'express'
import usercontroller from '../controller/AuthController.js';
import Validator from '../middleware/validator.js';
const Router  = express.Router();
Router.post('/auth/signup', Validator.newAccountRules(),Validator.validateInput,usercontroller.usercontroller.signup);
Router.post('/auth/signin' ,Validator.newSignInRules(), Validator.validateInput,usercontroller.usercontroller.signin);
//Router.post('/auth/signin' ,usercontroller.signin);
//auth/signup from pivot tracker as a POST



export default Router;





//import express from 'express'
//import usercontroller from '../controller/AutController';
//const Router  = express.Router();

//auth/signup from pivot tracker as a POST



//export default Router;