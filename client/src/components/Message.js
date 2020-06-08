import React from 'react';
import styled from 'styled-components';

const Message = ({text}) => {
  return (
    <MessageContainer>
      {text}
    </MessageContainer>
  )
}

const MessageContainer = styled.div`
  display: inline-flex;
  padding: 5px 20px;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: #66D6FF;
  font-family: 'BMJUA';
  font-size: 60px;
  color: white;
  border-radius: 30px;
`

export default Message;
