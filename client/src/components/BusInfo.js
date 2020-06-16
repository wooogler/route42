import React from 'react';
import styled from 'styled-components';
import BusNumberIcon from './BusNumberIcon';

const busColor = [
  {bus: '51', color: '#48B01B'},
  {bus: '55', color: '#03AFBD'},
  {bus: '5001', color: '#FF461E'},
  {bus: '8342', color: '#7094E2'},
]

const BusInfo = ({bus, min}) => {
  return (
    <BusInfoContainer>
      <BusInfoRow>
        <BusNumberIcon number={bus} color={bus && busColor.find(item => item.bus === bus).color}/>
        <BusInfoText>{min}분</BusInfoText>
      </BusInfoRow>
    </BusInfoContainer>
  )
}

const BusInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 100px;
  border: 1px solid #FF6B6B;
  border-radius: 10px;
  background-color: white;
  z-index: 10;
`

const BusInfoRow = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
`

const BusInfoText = styled.div`
  font-family: 'BMJUA';
  font-size: 40px;
  margin-left: 20px;
  color: #FF6B6B;
`

export default BusInfo
