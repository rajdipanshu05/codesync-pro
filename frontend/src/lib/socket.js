import { io } from "socket.io-client";
// import "dotenv/config";


// development
export const socket = io(
  "http://localhost:8000",
  {
    withCredentials: true,
    autoConnect: false,
  }
);

//production
// export const socket = io(
//   "https://codesync-backend-0xnc.onrender.com",
//   {
//     withCredentials: true,
//     autoConnect: false,
//   }
// );



/*
🧠 WHY autoConnect:false ?

Because:
❌ before login socket connect nahi karwana.

After auth:
✅ manually connect karenge.

Professional approach 
 */