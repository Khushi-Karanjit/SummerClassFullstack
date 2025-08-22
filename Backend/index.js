// initialization
import app from "./app.js";
import mongoose from "mongoose";
const port = 3000;

const uri = "mongodb+srv://KK:happy07@professionals.qlmr3d5.mongodb.net/?retryWrites=true&w=majority&appName=Professionals";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);

//Routes
app.get('/', (_req, res)=>{
    res.send("This is the Homepage");
});

//Starting the server in a port
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});