import React from 'react';
import styled from 'styled-components';

const Emoji = ({file, onClick, size}) => {
  return (
    <EmojiIcon size={size} src={require(`../../public/images/emoji/${file}`)} onClick={() => onClick(file)} />
  )
}

const EmojiIcon = styled.img`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
`

export default Emoji;
