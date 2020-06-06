import React from 'react'
import styled from 'styled-components';
import {Button} from 'antd';

const Problem = ({problem, choice, setChoice}) => {

  const handleClickA = () => {
    setChoice('a');
  }

  const handleClickB = () => {
    setChoice('b');
  }

  return (
    <div>
      <div>{problem.q}</div>
      <div>
        <Button type={choice==='a' && 'primary'} onClick={handleClickA}>{problem.a}</Button>
        <Button type={choice==='b' && 'primary'} onClick={handleClickB}>{problem.b}</Button>
      </div>
    </div>
  )
}

export default Problem;
