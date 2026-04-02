export const testcontroller = (req,res)=>{
    res.status(200).send({
        message : "test controller",
        success : true,
    });
}