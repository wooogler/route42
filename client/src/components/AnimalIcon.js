import React from 'react';
import styled from 'styled-components';

const AnimalIcon = ({animal, size, onClick, checked}) => {

  return (
    <AnimalImage onClick={onClick} src={require(`../../public/images/animals/${animal}.png`)} size={size} checked={checked}/>
  )
}

const AnimalImage = styled.img`
  width: ${(props) => `${props.checked ? props.size*2 : props.size}px`};
  height: ${(props) => `${props.checked ? props.size*2 : props.size}px`};
`

export default AnimalIcon;