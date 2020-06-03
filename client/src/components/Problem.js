import React from 'react'

const Problem = ({problem, handleRadioQuiz}) => {

  return (
    <div>
      <div>{problem.q}</div>
      <div>
        <label htmlFor="a">{problem.a}</label>
        <input id='a' type="radio" name="answer" value={problem.a} onChange={handleRadioQuiz}/>
        <label htmlFor="b">{problem.b}</label>
        <input id='b' type="radio" name="answer" value={problem.b} onChange={handleRadioQuiz}/>
      </div>
    </div>
  )
}

export default Problem;
