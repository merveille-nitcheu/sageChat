import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4000');
function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login socket={socket}/>} />
          <Route path='/chat' element={<Chat socket={socket}/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
