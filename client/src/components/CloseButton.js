import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

const CloseButton = ({station}) => {
  let history = useHistory();

  const handleClickClose = () => {
    history.push(`/${station}`)
  }

  return(
    <Button onClick={handleClickClose}>종료</Button>
  );
}

const Button = styled.button`
  border-radius: 50%;
  background-color: #FF6B6B;
  border:0;
  outline:0;
  color: white;
  font-size: 40px;
  width: 150px;
  height: 150px;
  box-shadow: 8px 8px 10px rgba(0,0,0,0.16);
  font-family: 'BMJUA';
  z-index: 100;
`

export default CloseButton;