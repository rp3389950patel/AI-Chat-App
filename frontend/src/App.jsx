// import './App.css'
// import Sidevar from './Sidevar.jsx'
// import ChatWindow from './ChatWindow.jsx'
// import { MyContext } from './MyContext.jsx'
// import { useState } from 'react'
// import { v1 as uuidv1 } from "uuid"
// function App() {

//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [currThreadId, setCurrThreadId] = useState(() => uuidv1());
//   const [prevChats, setPrevChats] = useState([]);//all prev chat store
//   const [newChat, setNewChat] = useState(true);
//   const [allThreads, setAllThreads] = useState([]);

//   const providerValues = {
//     prompt, setPrompt,
//     reply, setReply,
//     currThreadId, setCurrThreadId,
//     newChat, setNewChat,
//     prevChats, setPrevChats,
//     allThreads, setAllThreads
//   };

//   return (
//     <div className='main'>
//       <MyContext.Provider value={providerValues}>
//         <Sidevar />
//         <ChatWindow />
//       </MyContext.Provider>
//     </div>
//   )
// }

// export default App


import './App.css';
import Sidevar from './Sidevar.jsx';
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from './MyContext.jsx';
import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import Auth from './Auth.jsx';

function App() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(() => uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('calcora_user');
      const savedToken = localStorage.getItem('calcora_token');

      if (savedUser && savedToken) {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error('Could not load saved user:', error);
    }

    return null;
  });

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };

  const handleLogin = (userData, token) => {
    if (!userData || !token) {
      console.error('Login response is missing user data or token.');
      return;
    }

    localStorage.setItem('calcora_user', JSON.stringify(userData));
    localStorage.setItem('calcora_token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('calcora_user');
    localStorage.removeItem('calcora_token');

    setUser(null);
    setPrompt('');
    setReply(null);
    setPrevChats([]);
    setAllThreads([]);
    setNewChat(true);
    setCurrThreadId(uuidv1());
  };

  return (
    <MyContext.Provider value={providerValues}>
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <div className="main">
          <Sidevar />
          <ChatWindow />

          {/* <button
            type="button"
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button> */}
        </div>
      )}
    </MyContext.Provider>
  );
}

export default App;
