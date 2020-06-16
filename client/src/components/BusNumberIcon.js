import React from 'react';
import styled from 'styled-components';

const BusNumberIcon = ({checked, onClick, number, color}) => {
  return (
    <BusNumberContainer checked={checked} color={color} onClick={() => onClick(number)}>
      <BusNumberText color={color}>{number}</BusNumberText>
    </BusNumberContainer>
  )
}

const BusNumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => `${props.checked ? 120*1.4 : 120}px`};
  height: ${(props) => `${props.checked ? 50*1.4 : 50}px`};
  border: 5px solid ${(props) => `${props.color}`};
  border-radius: 10px;
  background-color: white;
`

const BusNumberText = styled.div`
  color: ${(props) => `${props.color}`};
  font-size: 40px;
`

export default BusNumberIcon;
