import React from 'react';
import styled from 'styled-components';


function FailBoxRight ({children}) {
  return(
    <Box>{children}</Box>
  );
}

const Box = styled.button`
  width: 490px;
  height: 250px;
  background-color: #CCF1FF;
  color: #6E6E6E;
  border: 0;
  outline: 0;
  justify-content: center;
  font-size: 80px;
  font-family: 'BMJUA';
  word-break: keep-all;
`

export default FailBoxRight;