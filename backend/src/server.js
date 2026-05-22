import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import axios from "axios"
import authRoutes from "./routes/auth.route.js";
import roomRoutes from "./routes/room.route.js";
import { app, server } from "./socket/socket.js";




const PORT = ENV.PORT || 3000;
// const app = express();
//payload too large error
app.use(express.json({limit:"5mb"})); //req.body
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());

// const response = await axios.post(
//   "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
//   {
//     language_id: 63,
//     source_code: "console.log('Ayush Goyal')"
//   }
// );
// console.log(response);
// console.log(response.data.stdout);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

connectDB()
    .then(()=>{
        server.listen(PORT,()=>{
            console.log(`Server is Listening on Port : ${PORT}`);
            ;
        })
    })
    .catch((err)=>{
        console.error("Failed to connect DB : ",err);
        process.exit(1);
        
    })