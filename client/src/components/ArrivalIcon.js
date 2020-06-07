import React from 'react'
import styled from 'styled-components';

const ArrivalIcon = ({checked, onClick, route, color, name}) => {
  return (
    <ArrivalContainer checked={checked} color={color} onClick={onClick}>
      <CircleNumber color={color}>{route}</CircleNumber>
      <StationText>{name}</StationText>
    </ArrivalContainer>
  )
}

const ArrivalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.checked ? 250*1.4 : 250}px`};
  height: ${(props) => `${props.checked ? 60*1.4 : 60}px`};
  border-radius: 60px;
  background-color: white;
  border: ${(props) => `10px solid ${props.color}`};
`;

const CircleNumber = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: ${(props) => `${props.color}`};
  color: white;
  font-size: 20px;
  border-radius: 50%;
`

const StationText = styled.div`
  font-size: 30px;
  margin-left: 10px;
`

export default ArrivalIcon;

