import React from 'react';
import styled from 'styled-components';


function FailBoxLeft ({children}) {
  return(
    <Button>{children}</Button>
  );
}

const Button = styled.button`
  width: 490px;
  height: 250px;
  background-color: #00BBFF;
  color: white;
  justify-content: center;
  font-size: 100px;
  border: 0;
  outline: 0;
  font-family: 'BMJUA';
  word-break: keep-all;
`

export default FailBoxLeft;