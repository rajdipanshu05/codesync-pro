# codesync-pro
src/
│
├── api/
│   └── axios.js
│
├── assets/
│
├── components/
│   │
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   │
│   ├── room/
│   │   ├── RoomSidebar.jsx
│   │   ├── ActiveUsers.jsx
│   │   ├── RoomNavbar.jsx
│   │   └── JoinRoomCard.jsx
│   │
│   ├── editor/
│   │   ├── CodeEditor.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── ThemeSelector.jsx
│   │   ├── InputBox.jsx
│   │   ├── OutputBox.jsx
│   │   └── RunButton.jsx
│   │
│   ├── chat/
│   │   ├── ChatBox.jsx
│   │   ├── MessageList.jsx
│   │   ├── MessageInput.jsx
│   │   └── ChatMessage.jsx
│   │
│   └── common/
│       ├── Loader.jsx
│       ├── ProtectedRoute.jsx
│       └── Navbar.jsx
│
├── hooks/
│   ├── useSocket.js
│   └── useAuth.js
│
├── layouts/
│   └── RoomLayout.jsx
│
├── pages/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── HomePage.jsx
│   ├── RoomPage.jsx
│   └── NotFound.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── store/
│   ├── authStore.js
│   ├── roomStore.js
│   ├── editorStore.js
│   └── chatStore.js
│
├── lib/
│   └── socket.js
│
├── utils/
│   └── constants.js
│
├── App.jsx
├── main.jsx
└── index.css