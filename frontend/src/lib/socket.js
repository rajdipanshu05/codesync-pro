import { io } from "socket.io-client";
// import "dotenv/config";

export const socket = io(
  "http://localhost:8000",
  {
    withCredentials: true,
    autoConnect: false,
  }
);
// export const socket = io(
//   "http://localhost:8000",
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