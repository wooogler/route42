import React, {useState, useEffect} from 'react';
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
import Background from '../components/Background';
import BusInfo from '../components/BusInfo';

let socket;

const Chat = ({location, match}) => {
  const {station} = match.params;
  let history = useHistory();
  const [animal, setAnimal] = useState('');
  const [bus, setBus] = useState('');
  const [messages, setMessages] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [other, setOther] = useState(null);
  const [inst, setInst] = useState(true);
  const room = 'chat';
  const ENDPOINT = 'https://route42-server.herokuapp.com/';

  useEffect(() => {
    const {bus, animal} = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setBus(bus);
    setAnimal(animal); 

    socket.emit('join', {animal, room, station}, (error) => {
      if(error) {
        alert(error);
      }
    })

    return () => {
      socket.disconnect();
    }
  }, [ENDPOINT, location.search, station])

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
    setTimeout(() => {
      setInst(false);
    }, 5000)
  }, [station])

  useEffect(() => {
    if(countdown === 0){
      history.push(`/${station}/quiz?animal=${animal}&bus=${bus}`);
    }
  }, [countdown, station, animal, history, bus])

  const handleClickMessage = (text) => {
    if(text) {
      socket.emit('sendMessage', {room, message:text}, () => {});
    }
  }

  const handleClickEmoji = (emoji) => {
    if(emoji) {
      socket.emit('sendMessage', {room, message: emoji}, () => {});
    }
  }

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
      {
        !countdown && inst &&
        <Background>
          <Instruction>
            급히 종료를 해야할 경우<br/>
            위의 버튼을 눌러주세요.
          </Instruction>
          <Instruction>
            연결중입니다...<br/><br/>
            관심을 끌기 위해 채팅을 보내보세요! <br/>
            다른 정류소에 보여집니다.
          </Instruction>
        </Background>
      }
      {
        countdown && countdown>30 && 
        <Background>
          <Instruction>
            급히 종료를 해야할 경우<br/>
            위의 버튼을 눌러주세요.
          </Instruction>
          <div style={{height: '100px'}}/>
          {other?.animal && <AnimalIcon animal={other.animal} size='300'/>}
          <Instruction>
            다른 정류소에서 응답이 왔어요!<br/>
            <span style={{color: '#FF6B6B'}}>30초</span> 동안 인사를 나눠보세요
          </Instruction>
        </Background>
      }
      <Header>
        <AvatarContainer>
        {
          other?.animal && <AnimalIcon animal={other.animal} size='150'/>
        }
        </AvatarContainer>
        <CloseButton station={station}/>
        <BusInfo bus={bus} min={'5'} />
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
          <div>
            <InputContainer>
              <Message onClick={handleClickMessage}>51번 버스</Message>
              <Message onClick={handleClickMessage}>55번 버스</Message>
              <Message onClick={handleClickMessage}>5001번 버스</Message>
              <Message onClick={handleClickMessage}>8342번 버스</Message>
              <Message onClick={handleClickMessage}>더 못 타요 ㅠㅠ</Message>
              <Message onClick={handleClickMessage}>서서 타야해요 ㅠ</Message>
              <Message onClick={handleClickMessage}>앉을 자리 있네요!</Message>
              <Message onClick={handleClickMessage}>널널합니다!</Message>
              <Message onClick={handleClickMessage}>아무도 없네요 ㅋ</Message>
            </InputContainer>
          </div>
        </Slider>
      </div>
    </PageContainer>
  )
}

const Instruction = styled.div`
  font-family: 'BMJUA';
  font-size: 60px;
  color: #00BBFF;
  margin-top : 140px;
  line-height: 70px;
  text-align: center;
`

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