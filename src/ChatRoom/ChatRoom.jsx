import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import './ChatRoom.scss';
let socket;

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const { nickname } = useParams(); // URL 파라미터로 받아온 닉네임을 nickname으로 설정
  useEffect(() => {
    // WebSocket 연결 설정
    socket = new Client({
      brokerURL: 'ws://43.202.160.134:8080/chat',
      debug: function (str) {
        console.log(str);
      },
    });

    // 연결이 열렸을 때
    socket.onConnect = function () {
      console.log('WebSocket 연결이 열렸습니다.');

      // /topic/messages 주소를 구독
      socket.subscribe('/topic/messages', function (message) {
        // 서버에서 전송한 메시지를 받아와서 화면에 표시

        const parsedMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, { nickname: parsedMessage.nickname, content: parsedMessage.message }]);
      });
    };

    // WebSocket 오류가 발생했을 때
    socket.onStompError = function (frame) {
      console.error('WebSocket 오류:', frame.headers.message);
    };

    // WebSocket 활성화
    socket.activate();

    // 컴포넌트 언마운트 시 WebSocket 비활성화
    return () => socket.deactivate();
  }, []);

  // 메시지 전송 함수
  const sendMessage = (event) => {
    if (!messageInput.trim()) return;

    // /app/chat 주소로 메시지 전송
    socket.publish({
      destination: '/app/chat',
      body: JSON.stringify({ 'message': messageInput, 'nickname': nickname }), // 닉네임과 메시지를 함께 보냄
    });
    
    
    setMessageInput('');
  };

  // const handleOnKeyDown = (event) => {
  //   if(event.key === 'Enter'){
  //     sendMessage(event);
  //     event.preventDefault();  // textarea 엔터키를 방지한다.
  //   }
  // };
  return (
    <div className='chatRoom'>
      <div className='chatRoom__container'>
        <h1>Open Chatting Room</h1>
        <div className='chatRoom__container__chatBox'>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                <p>{message.nickname} : {message.content}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className='chatRoom__container__sendBox'>
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="메시지 입력"
            // onKeyDown={handleOnKeyDown}
            
          />
          <button onClick={sendMessage}>보내기</button> 
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
