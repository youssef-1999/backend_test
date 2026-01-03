const express=require("express");
const port=process.env.PORT||3000;
const app=express()
app.use(express.json())
const userRouter=express.Router()
const users=[]

// create user
userRouter.post("/", (req, res) => {
   const {name,email,password,id}=req.body 
   const user=users.find((user)=>user.email==email)
   if(user){
    return res.status(400).json({message:"user already exists"})
   }
   users.push({id,name,email,password})
   return res.status(201).json({message:"user created successfully"})
})
//get all users
userRouter.get("/", (req, res) => {
    return res.status(200).json({results:users})
})
//get user
userRouter.get("/:id", (req, res) => {
    const {id}=req.params 
    const user=users.find((user)=>user.id==id)
    !user?res.status(404).json({message:"user not found"}) : res.status(200).json({results:user})
})
//update user
userRouter.patch("/:id", (req, res) => {
const {id}=req.params
const {name}=req.body
const user=users.find((user)=>user.id==id)
if(!user){
    return res.status(404).json({message:"user not found"})
}
user.name=name

return res.status(200).json({message:"user updated successfully"})
})
//delete user
userRouter.delete("/:id", (req, res) => {
    const {id}=req.params
    const user=users.find((user)=>user.id==id)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    users.splice(users.indexOf(user),1)
    return res.status(200).json({message:"user deleted successfully"})
})
app.use("/users",userRouter)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})