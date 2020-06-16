import React from 'react';
import styled from 'styled-components';


function SelectBoxLeft ({children, checked, onClick}) {
  return(
    <Button checked={checked} onClick={onClick}>{children}</Button>
  );
}

const Button = styled.button`
  width: 490px;
  height: 620px;
  background-color: #00BBFF;
  color: white;
  justify-content: center;
  font-size: 90px;
  border: ${(props) => `${props.checked ? '30px solid #FF6B6B' : '0'}`};
  outline: 0;
  font-family: 'BMJUA';
  word-break: keep-all;
`

export default SelectBoxLeft;