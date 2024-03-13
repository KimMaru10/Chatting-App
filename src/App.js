import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatRoom from './ChatRoom/ChatRoom';
import ChatJoin from './Chat/ChatJoin';

function App() {
  const [nickname, setNickname] = useState("");
  
  const handleJoin = (nickname) => {
    setNickname(nickname);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact={true} element={<ChatJoin onJoin={handleJoin} />} />
        <Route path='/chatRoom/:nickname' element={<ChatRoom nickname={nickname}/>} /> 
      </Routes>
    </div>
  );
}

export default App;
