import React from 'react';
import styled from 'styled-components';

const Background = ({children}) => {
  return (
    <BackgroundContainer>
      {children}
    </BackgroundContainer>
  )
}

const BackgroundContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 930px;
  height:1200px;
  background-color: rgba(0,0,0,0.9);
  top: 90px;
  left: 50px;
  z-index: 3;
`;

export default Background;
