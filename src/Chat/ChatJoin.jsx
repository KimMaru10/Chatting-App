import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './ChatJoin.scss';
const ChatJoin = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();//기본 폼 제출 방지
        navigate(`/chatRoom/${nickname}`);
    }
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
          />
          <button type='submit'>입장하기</button>
        </form>
      </div>
    </div>
  )
}
export default ChatJoin;