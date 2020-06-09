import React from 'react'
import styled from 'styled-components';

const Countdown = ({children}) => {
  return (
    <CountdownContainer>
      <CountdownNumber>{children}</CountdownNumber>
    </CountdownContainer>
  )
}

const CountdownContainer = styled.div`
  display: flex;
  border: 10px solid #707070;
  border-radius: 50%;
  width: 140px;
  height:140px;
  justify-content: center;
  align-items: center;
`

const CountdownNumber = styled.div`
  font-family: 'BMJUA';
  font-size: 100px;
  color: #707070;
`

export default Countdown;
