import mongoose from "mongoose";

export default async function(){
     try{
        const connect=await mongoose.connect(process.env.mongo_url,{dbName:"MERN_E_Commerce"}
      ).then(()=>console.log("MongoDB Connected Succssfully...!")).catch((err)=>console.log(err));
     }catch(error){
        console.log("problem in connecting db.....")
     }
}