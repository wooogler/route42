import React from 'react';
import styled from 'styled-components';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom'
import Emoji from './Emoji';

const ChatViewer = ({messages, station}) => {
  return (
    <ChatContainer>
      {
        messages.map((message, i)=> (
          <ChatRow key={i} mine={station === message.station}>
            {
              message.text.endsWith('.gif') ? 
              <Emoji file={message.text} size={140}/> :
              <Message>{message.text}</Message>
            }
          </ChatRow>
        ))
      }
    </ChatContainer>
  )
}

const ChatContainer = styled(ScrollToBottom)`
  display: flex;
  flex-direction: column;
  width: 1008px;
  height: 630px;
`

const ChatRow = styled.div`
  display: flex;
  width: 1008px;
  justify-content: ${(props) => `${props.mine ? 'flex-end' : 'flex-start'}`};
`

export default ChatViewer;
