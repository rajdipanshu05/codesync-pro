<div align="center">

#  CodeSync Pro

**A real-time collaborative coding platform with live chat, video meetings, and a built-in code judge.**

[![JavaScript](https://img.shields.io/badge/JavaScript-99.7%25-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://github.com/rajdipanshu05/codesync-pro)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101?style=flat-square&logo=socket.io)](https://socket.io)
[![Stars](https://img.shields.io/github/stars/rajdipanshu05/codesync-pro?style=flat-square&color=FFD700)](https://github.com/rajdipanshu05/codesync-pro/stargazers)
[![Forks](https://img.shields.io/github/forks/rajdipanshu05/codesync-pro?style=flat-square&color=blue)](https://github.com/rajdipanshu05/codesync-pro/forks)

</div>

---

##  Features

-  **Real-time Collaborative Editor** — Write code together with your team, changes sync instantly via WebSockets
-  **Built-in Code Judge** — Run and submit solutions against test cases (JavaScript, Python, Java, C++) powered by Judge0
-  **Live Room Chat** — Real-time per-room chat synced across all participants
-  **Video Meetings** — Peer-to-peer video calling via WebRTC so your team can pair program face-to-face
-  **Theme & Language Selector** — Multiple editor themes and on-the-fly language switching
-  **Auth System** — JWT-based login/signup with protected routes
-  **Coding Problems** — Curated problems (Easy → Hard) with visible and hidden test cases
-  **Active Users Panel** — See who's live in the room in real time

---

##  Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Zustand, React Router, Axios |
| Editor | Monaco Editor |
| Real-time | Socket.io |
| Video | WebRTC |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Auth | JWT, bcrypt |
| Code Execution | Judge0 API |

---

##  Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- Judge0 instance or `ce.judge0.com` access

### 1. Clone the repo
```bash
git clone https://github.com/rajdipanshu05/codesync-pro.git
cd codesync-pro
```

### 2. Backend
```bash
cd backend
npm install
```

Create `.env` in `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/codesync-pro
JWT_SECRET=your_jwt_secret_here
JUDGE0_URL=https://ce.judge0.com
MODE=development
```

```bash
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

##  Contributing

Pull requests are welcome! Please open an issue first for major changes.

1. Fork the repo
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

<div align="center">

Made with ❤️ by [rajdipanshu05](https://github.com/rajdipanshu05) and [Ayushhgi](https://github.com/Ayushhgi)

 **Star this repo if you found it helpful!**

</div>
