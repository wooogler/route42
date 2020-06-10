import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

import AnimalIcon from '../components/AnimalIcon';
import Message from '../components/Message';
import Emoji from '../components/Emoji';

let socket;

const Start = ({match}) => {
  const {station} = match.params;
  const ENDPOINT = 'localhost:5000';
  const [message, setMessage] =useState('');
  const room = 'chat';

  useEffect(() => {
    socket = io(ENDPOINT);
    
    socket.emit('join', {animal: 'anonymous', room}, (error) => {
      if(error) {
        alert(error);
      }
    })

    return () => {
      console.log('disconnect from Start');
      socket.disconnect();
    }
  }, []);

  useEffect(()=> {
    socket.on('message', (message) => {
      setMessage(message);
    })
  }, [message]);
  // TODO 채팅을 나갔을 때, 동물 사라지게 할 것
  return (
    <Link to={`/${station}/select`} style={{textDecoration: 'none'}}>
      <PageContainer>
        <Title>ROUTE42</Title>
        <StationContainer>
          {
            message && 
            <>
              <AnimalIconContainer>
                <AnimalIcon animal={message.user} size='350'/>
              </AnimalIconContainer>
              <MessageContainer>
                {
                  message.text.endsWith('.gif') ? 
                  <Emoji file={message.text} size={200}/> :
                  <Message>{message.text}</Message>
                }
              </MessageContainer>
            </>
          }
          
          <StationImage src='images/station1.png'></StationImage>
        </StationContainer>
        <KnockText>연결하시려면</KnockText>
        <KnockText>노크해주세요</KnockText>
      </PageContainer>
    </Link>
  )
}



const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1008px;
  height: 1310px;
  border-top: 20px solid #00BBFF;
  border-bottom: 20px solid #00BBFF;
`;

const AnimalIconContainer = styled.div`
  position: absolute;
  top: 140px;
  left: 125px;
  z-index: 1;
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 30px;
  z-index: 2;
`

const Title = styled.div`
  font-size: 150px;
  margin-bottom: 50px;
  font-family: 'BMJUA';
  text-shadow: 0 0 10px #FF6B6B;
  color: #FF6B6B;
`

const StationContainer = styled.div`
  width: 600px;
  height: 600px;
  background-color: #45CDFF;
  border-radius: 50%;
  position: relative;
  box-shadow: 0px 0px 10px 10px #45CDFF;
  margin-bottom: 70px;
`

const StationImage = styled.img`
  position: absolute;
  top: 30px;
  left: 30px;
`

const KnockText = styled.div`
  font-size: 80px;
  color: #00BBFF;
  font-family: 'BMJUA';
`

export default Start;
