import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './ChatJoin.scss';
const ChatJoin = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        if(nickname.trim() === ''){ // 'trim()' 메소드는 문자열의 양 끝에 있는 공백을 제거합니다.
          alert("닉네임이 입력되지 않았습니다.");
        }else{
          navigate(`/chatRoom/${nickname}`);
        }
    }
    const handleOnKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
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
            value={nickname}
            onChange={(e)=>setNickname(e.target.value)} 
            onKeyDown={handleOnKeyPress}        
          />

          <button type='submit' >입장하기</button>
        </form>
      </div>
    </div>
  )
}
export default ChatJoin;