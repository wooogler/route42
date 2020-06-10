import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';
import Slider from "react-slick";
import ChatViewer from '../components/ChatViewer';
import Message from '../components/Message';
import CloseButton from '../components/CloseButton';
import AnimalIcon from '../components/AnimalIcon';
import Countdown from '../components/Countdown';
import Emoji from '../components/Emoji';

let socket;

const Chat = ({location, match}) => {
  const {station} = match.params;
  let history = useHistory();
  const [animal, setAnimal] = useState('');
  const [opAnimal, setOpAnimal] = useState('');
  const [arrival, setArrival] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [other, setOther] = useState(null);
  const room = 'chat';
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const {arrival, animal} = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setArrival(arrival);
    setAnimal(animal); 

    socket.emit('join', {animal, room, station}, (error) => {
      if(error) {
        alert(error);
      }
    })

    return () => {
      socket.disconnect();
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    })
    socket.on('countdown', (count) => {
      setCountdown(count);
    })
    socket.on('joined', (joinedUser) => {
      console.log('station: ',station);
      setOther(
        joinedUser.filter(user => {
          return user.station !== station;
        })[0]
      );
    })
  }, [])

  useEffect(() => {
    if(countdown === 0){
      history.push(`/${station}/quiz?animal=${animal}&arrival=${arrival}`);
    }
  }, [countdown])

  const handleClickMessage = useCallback((text) => {
    setMessage(text);
    if(text) {
      socket.emit('sendMessage', {room, message:text}, () => setMessage(''));
    }
  }, [message])

  const handleClickEmoji = useCallback((emoji) => {
    setMessage(emoji);
    if(emoji) {
      socket.emit('sendMessage', {room, message: emoji}, () => setMessage(''));
    }
  }, [message])

  const settings = {
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
  }

  return (
    <PageContainer>
      <Header>
        <AvatarContainer>
        {
          other?.animal && <AnimalIcon animal={other.animal} size='150'/>
        }
        </AvatarContainer>
        <CloseButton station={station}/>
        <AvatarContainer>
        {
          animal && <AnimalIcon animal={animal} size='150'/>
        }
        </AvatarContainer>
      </Header>
      <ChatContainer>
        <ChatViewer messages={messages} station={station} />
        {
          countdown && 
          <CountdownContainer>
            <Countdown>{countdown}</Countdown>
          </CountdownContainer>
        }
      </ChatContainer>
      <div style={{width: '100%'}}>
        <Slider {...settings}>
          <div>
            <InputContainer>
              <Message onClick={handleClickMessage}>안녕하세요!</Message>
              <Message onClick={handleClickMessage}>반가워요</Message>
              <Message onClick={handleClickMessage}>행운을 빌어요</Message>
              <Message onClick={handleClickMessage}>오늘도 화이팅!</Message>
              <Message onClick={handleClickMessage}>고마워요</Message>
              <Message onClick={handleClickMessage}>힘내요TT</Message>
              <Message onClick={handleClickMessage}>^3^</Message>
              <Message onClick={handleClickMessage}>다 잘될거에요</Message>
              <Message onClick={handleClickMessage}>너무 피곤해요ㅜ</Message>
              <Message onClick={handleClickMessage}>잘있어요</Message>
              <Message onClick={handleClickMessage}>또 만나요</Message>
              <Message onClick={handleClickMessage}>건강조심하세요!</Message>
            </InputContainer>
          </div>
          <div>
            <InputContainer>
            {
              [...Array(20).keys()].map((num) => {
                return (
                  <EmojiContainer>
                    <Emoji file={`${num+1}.gif`} onClick={handleClickEmoji} size={115}/>
                  </EmojiContainer>
                )
              })
            }
            </InputContainer>
          </div>
        </Slider>
      </div>
      
      
        
      
    </PageContainer>
  )
}


const EmojiContainer = styled.div`
  margin: 0px 40px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:1008px;
  height:200px;
`

const ChatContainer = styled.div`
  position: relative;
`

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:200px;
  width:150px;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 1008px;
  height: 1310px;
  border-top: 20px solid #00BBFF;
  border-bottom: 20px solid #00BBFF;
`;

const InputContainer = styled.div`
  display: flex;
  width: 1008px;
  height: 460px;
  border-top: 15px solid #FF6B6B;
  flex-wrap: wrap;
  justify-content: space-around;
`

const CountdownContainer = styled.div`
  position: absolute;
  top: 250px;
  left: 430px;
`

export default Chat;