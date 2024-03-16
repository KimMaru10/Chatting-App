import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatRoom from './ChatRoom/ChatRoom';
import ChatJoin from './Chat/ChatJoin';

function App() {
  const [user_id, setUser_id] = useState("");
  
  const handleJoin = (user_id) => {
    setUser_id(user_id);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact={true} element={<ChatJoin onJoin={handleJoin} />} />
        <Route path='/chatRoom/:user_id' element={<ChatRoom user_id={user_id}/>} /> 
      </Routes>
    </div>
  );
}

export default App;
