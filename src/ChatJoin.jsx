import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const ChatJoin = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();//기본 폼 제출 방지
        navigate(`/chatRoom/${nickname}`);
    }
  return (
    <div>
        <h1>ChatJoin</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type='text' 
            placeholder='닉네임을 입력 하세요' 
            value={nickname}
            onChange={(e)=>setNickname(e.target.value)}
            />
            <button type='submit'>입장하기</button>
        </form>
    </div>
  )
}
export default ChatJoin;