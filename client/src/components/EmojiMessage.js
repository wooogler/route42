import React from 'react';
import styled from 'styled-components';
import Emoji from './Emoji';

const EmojiMessage = ({children}) => {
  return (
    <Emoji file={children}/>
  )
}

const EmojiContainer = styled.div`
  width: 100px;
  height: 100px;
`

export default EmojiMessage
