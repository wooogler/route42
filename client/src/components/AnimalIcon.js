import React from 'react';
import styled from 'styled-components';

const AnimalIcon = ({animal, size, onClick, checked}) => {

  return (
    <AnimalImage onClick={() => onClick(animal)} src={require(`../../public/images/animals/${animal}.png`)} size={size} checked={checked}/>
  )
}

const AnimalImage = styled.img`
  width: ${(props) => `${props.checked ? props.size*2 : props.size}px`};
  height: ${(props) => `${props.checked ? props.size*2 : props.size}px`};
  z-index: 1;
`

export default AnimalIcon;