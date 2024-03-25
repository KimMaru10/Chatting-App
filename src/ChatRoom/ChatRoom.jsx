import React, { useState, useEffect,useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import './ChatRoom.scss';
let socket;

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const { userName, roomName} = useParams(); // URL 파라미터로 받아온 닉네임을 user_id으로 설정
  const messageBoxRef = useRef(null);

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
      
      // 방 번호를 서버에 전송
      socket.publish({
        destination: '/topic/messages',
        body: JSON.stringify({ 'roomName': roomName })
      });

      // /topic/messages 주소를 구독
      socket.subscribe(`/topic/messages/${roomName}`, function (message) {
        // 서버에서 전송한 메시지를 받아와서 화면에 표시
        
        const parsedMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, { userName: parsedMessage.userName, content: parsedMessage.message }]);
      });
    };

    // WebSocket 연결이 닫혔을 때
    socket.onDisconnect = function () {
      console.log('WebSocket 연결이 닫혔습니다.');
    };

    // WebSocket 오류가 발생했을 때
    socket.onStompError = function (frame) {
      console.error('WebSocket 오류:', frame.headers.message);
    };

    // WebSocket 활성화
    socket.activate();

    // 컴포넌트 언마운트 시 WebSocket 비활성화
    return () => socket.deactivate();
  }, [roomName]);

  // 메시지 전송 함수
  const sendMessage = (event) => {
    if (!messageInput.trim()) return;

    // /topic/messages/roomName 주소로 메시지 전송
    socket.publish({
      destination: `/topic/messages/${roomName}`,
      body: JSON.stringify({ 'message': messageInput, 'userName': userName }), // 닉네임과 메시지를 함께 보냄
    });
    setMessageInput('');
  };
  
  //채팅 기록을 가져오는 함수
  // const fetchChatHistory = async (room_id) => {
  //   try {
  //       const response = await axios.get(`/api/chat/history/${room_id}`); //나중에 변경
  //       return response.data; // 가져온 채팅 기록을 반환
  //   } catch (error) {
  //       throw new Error('채팅 기록을 가져오는 중 오류 발생: ' + error.message);
  //   }
  // };

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 fetchChatHistory 함수를 호출하여 채팅 기록을 가져옴
  //   const room_name = roomName; // 채팅방의 아이디 혹은 필요한 값
  //   fetchChatHistory(room_name)
  //     .then(chatHistory => {
  //       // 가져온 채팅 기록을 상태에 설정
  //       setMessages(chatHistory);
  //     })
  //     .catch(error => {
  //       console.error('이전 채팅 기록을 가져오는 중 오류 발생:', error.message);
  //     });
  // }, [roomName]);

  //채팅 입력시 엔터키로 전송
  const handleOnKeyDown = (event) => {
    if(event.keyCode === 13){
      sendMessage(event);
      event.preventDefault();  // textarea 엔터키를 방지한다.
    }
  };

  //채팅앱 스크롤
  const scrollToBottom = () =>{
    if(messageBoxRef.current !== null){
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(()=>{
    scrollToBottom();
  },[messages])

  return (
    <div className='chatRoom'>
      <div className='chatRoom__container'>
        <h1>{roomName}</h1>
        <div className='chatRoom__container__chatBox' ref={messageBoxRef}>
          <ul>
            {messages.map((message, index) => (
              <li key={index} className={message.userName === userName ? 'sent' : 'received'}>
                <p className='userName'>{message.userName !== userName ? message.userName: ''} </p>
                <p className='contant'>{message.content}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className='chatRoom__container__sendBox'>
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="메시지 입력"
            onKeyDown={handleOnKeyDown}
          />
          <button onClick={sendMessage}>보내기</button> 
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
