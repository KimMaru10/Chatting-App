import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './ChatJoin.scss';
import axios from 'axios';
const ChatJoin = () => {
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault(); //이벤트의 기본 동작을 방지합니다.
      if(userName.trim() === '' || roomName.trim() === ''){ // 'trim()' 메소드는 문자열의 양 끝에 있는 공백을 제거합니다.
        alert("닉네임 또는 채팅 룸 번호가 입력되지 않았습니다.");
      }else{
        const JoinData = {
          userName:userName,
          roomName:roomName
        }
        // axios를 사용하여 POST 요청을 보냅니다. 
        axios.post("http://kim-sun-woo.com/chat/info", JoinData)
          .then(response =>{
            //요청이 성공한 경우, ChatRoom으로 이동합니다. 
            navigate(`/chatRoom/${roomName}/${userName}`);
          })
          .catch(error => {
              console.error('Error sending data to server:', error);
              alert("서버와의 통신에 문제가 발생했습니다.");
          })
      }
    }
    const handleOnKeyPress = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        handleSubmit(event); // Enter 입력이 되면 클릭 이벤트 실행
      }
    };
  return (
    <div className='chatJoin'>
      <div className='chatJoin__container'>
        <form onSubmit={handleSubmit} className='chatJoin__container__form'>
          <h1>ChatJoin</h1>
          <p>오픈채팅방에서 사용하실 닉네임을 입력하세요</p>
          <input 
            className='chatJoin__inputBox'
            type='text' 
            placeholder='닉네임을 입력 하세요' 
            value={userName}
            onChange={(e)=>setUserName(e.target.value)} 
            onKeyDown={handleOnKeyPress}        
          />
          <input 
            className='chatJoin__inputBox'
            type='text'
            placeholder='채팅방 번호를 입력하세요'
            value={roomName}
            onChange={(e)=>setRoomName(e.target.value)}
            onKeyDown={handleOnKeyPress} 
          />
          <button type='submit' >입장하기</button>
        </form>
      </div>
    </div>
  )
}
export default ChatJoin;