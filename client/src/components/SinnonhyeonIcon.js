import React from 'react'
import styled from 'styled-components';

const GangnamIcon = ({checked, onClick}) => {
  return (
    <ArrivalIcon>
      <CircleNumber>2</CircleNumber>
      <StationText>강남</StationText>
    </ArrivalIcon>
  )
}

const ArrivalIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 60px;
  border-radius: 60px;
  background-color: white;
  border: 10px solid #3CB44A;
`;

const CircleNumber = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #3CB44A;
  color: white;
  font-size: 20px;
  border-radius: 50%;
`

const StationText = styled.div`
  font-size: 30px;
  margin-left: 10px;
`

export default GangnamIcon;

