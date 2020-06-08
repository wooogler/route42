import React from 'react';
import styled from 'styled-components';

const Message = ({children, onClick}) => {
  return (
    <MessageContainer onClick={() => onClick(children)}>
      {children}
    </MessageContainer>
  )
}

const MessageContainer = styled.div`
  display: inline-flex;
  padding: 10px 25px;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: #66D6FF;
  font-family: 'BMJUA';
  font-size: 60px;
  color: white;
  border-radius: 30px;
  margin: 10px 10px;
`

export default Message;
