import express from 'express';
import blogController from '../controller/blogpostController';
import {verifyAuth} from '../middleware/AuthVerification';
import Validator from "../middleware/validator";
const router  = express.Router();
router.post('/blogpost/createblog',verifyAuth,Validator.newBlogInRules(),Validator.validateInput,blogController.createblogpost);
router.get('/blogpost/all',verifyAuth ,blogController.getAllBlog);
router.get('/blogpost/one/:id' ,verifyAuth,blogController.getOneBlog);
router.delete('/blogpost/deleteone/:id' ,verifyAuth,Validator.VerifyAccess,Validator.validateInput,blogController.deleteOneBlog);
router.patch('/blogpost/updateOneBlog/:id' ,verifyAuth,Validator.VerifyAccess,Validator.validateInput, blogController.updateOneBlog);


export default router;

