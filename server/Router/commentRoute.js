import express from "express";
import commentController from "../controller/commentController";
import {verifyAuth} from '../middleware/AuthVerification';

const commentRoute =express.Router();

commentRoute.post('/create/:id',verifyAuth,commentController.createComment);

commentRoute.delete('/deletecomment/:id',verifyAuth,commentController.deleteComment);

export default commentRoute;