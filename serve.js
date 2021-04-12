
import express from "express";
import bodyParse from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Authroute from './server/Router/Authroute';
import blogpostAuthroute from './server/Router/blogpostRouter';
import Response from "./server/Helpers/response";
import commentRoute from './server/Router/commentRoute';
dotenv.config({path:"./.env"});

const app = express();


app.use(bodyParse.json());
app.use('/api/v1/blogpost' ,Authroute);
app.use('/api/v1/blog' , blogpostAuthroute);
app.use('/api/v1/comment' ,commentRoute );

app.use('/', (req, res) => {

    return  Response.errorMessage(res, "This is route doesn't exist", 417)
    
})
//we'are going to connect database NA PORT yacu, kugirango ijye iraningira kur port ya data base apana imwe ya1

const dataBaseURL=process.env.DATABASE
mongoose.connect(dataBaseURL,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false,}).then(()=>
{console.log("db is successfully connected")})
const port= process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
export default app;


