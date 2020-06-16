import React from 'react';
import styled from 'styled-components';


function SelectBoxRight ({children, checked, onClick}) {
  return(
    <Box checked={checked} onClick={onClick}>{children}</Box>
  );
}

const Box = styled.button`
  width: 490px;
  height: 620px;
  background-color: #CCF1FF;
  color: #6E6E6E;
  border: ${(props) => `${props.checked ? '30px solid #FF6B6B' : '0'}`};
  outline: 0;
  justify-content: center;
  font-size: 90px;
  font-family: 'BMJUA';
  word-break: keep-all;
`

export default SelectBoxRight;