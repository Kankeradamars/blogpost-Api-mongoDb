import mongoose from 'mongoose'
const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: [true, "title must be provided"] },
        content: { type: String, required: true},
        userId: { type:mongoose.Schema.ObjectId,
            ref:"user",
            required:[true,"user is required"]
        },
        timeStamp: {
            type: String
        },
        commentId: [
            {
                type:mongoose.Schema.ObjectId,
                ref: "comment",
            }
        ]
    }
);






blogSchema.pre(/^find/,function(next){
    this.populate({
        path:"userId",
        select:"firstName email"
    }).populate({
        path:"commentId",
        select:"content user timeStamp"
    })
    next();
})
const blogData=mongoose.model("blogpost", blogSchema);
export default blogData;