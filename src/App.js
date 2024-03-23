import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatRoom from './ChatRoom/ChatRoom';
import ChatJoin from './Chat/ChatJoin';

function App() {
  const [userName, setUserName] = useState("");
  
  const handleJoin = (userName) => {
    setUserName(userName);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact={true} element={<ChatJoin onJoin={handleJoin} />} />
        <Route path='/chatRoom/:roomName/:userName' element={<ChatRoom userName={userName}/>} /> 
      </Routes>
    </div>
  );
}

export default App;
