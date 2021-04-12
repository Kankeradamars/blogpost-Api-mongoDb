import commentInfo from "../model/commentmodel";
import blogInfo from "../model/blogpostModel";
import Response from "../Helpers/response";
class commentController {
    static createComment = async (req, res) => {
        let { content } = req.body;
        let blogidFromParams = req.params.id;

        const newComment = await commentInfo.create(req.body);
        //console.log(newComment)

        const blogComment = await blogInfo.findByIdAndUpdate(blogidFromParams, {
            $push: {
                commentId: newComment._id

            }
        })
        if(!blogComment){
            return Response.errorMessage(res, "failed to create comment", 404)
           
        }
        return Response.successMessage(res,"comment created successfully", blogComment, 200)
    }

        static deleteComment= async(req, res)=>{
            const commentId= req.params.id;
            const commentData= await commentInfo.findByIdAndDelete(commentId)
            if(!commentData){
                return Response.errorMessage(res, "comment delete failed", 417)
               
            }
            return Response.successMessage(res,"delete comment is succeessfully",commentData, 200)
        }
}

export default commentController