const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

// writing configuration 
dotenv.config();

// this is the promise
mongoose.connect(
    process.env.MONGO_URL // this is the private key we cant share this to public so we use env to prevent this
).then(()=>{
    console.log("DB connection is successfull");
}).catch((err)=>{
    console.log(err);
});

// craeting routes i.e creating REST api and we will use some end points
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
   

app.listen(process.env.PORT  || 5000, ()=>{
    console.log("backend server is running...");  // for running the 'app' application we provide here port number and the call back function 
});



