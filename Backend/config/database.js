import mongoose from "mongoose";
const database =async()=>{
try {
  const dburl=process.env.MONGODB_URI;
  await mongoose.connect(dburl);
  console.log("database is connected......")
} catch (error) {
  console.error(error.message);
}
}
export default database;