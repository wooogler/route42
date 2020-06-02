import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Select = ({match}) => {
  const {station} = match.params
  const [arrival, setArrival] = useState('');
  const [animal, setAnimal] = useState('');
  const handleSubmit = (e) => {
    if(!arrival || !animal) {
      e.preventDefault();
    }
    console.log(arrival);
    console.log(animal);
  }

  const handleRadioArrival = (e) => {
    setArrival(e.target.value)
  }
  const handleRadioAnimal = (e) => {
    setAnimal(e.target.value);
  }
  return (
    <div>
      <div>{station}</div>
      <form onSubmit={handleSubmit}>
        <div>arrival</div>
        <div>
          <input type="radio" name="arrival" value='gangnam' onChange={handleRadioArrival} />
          <input type="radio" name="arrival" value='sinnonhyeon' onChange={handleRadioArrival} />
        </div>
        <div>animal</div>
        <div>
          <input type="radio" name="animal" value='pig' onChange={handleRadioAnimal} />
          <input type="radio" name="animal" value='panda' onChange={handleRadioAnimal} />
          <input type="radio" name="animal" value='giraffe' onChange={handleRadioAnimal} />
          <input type="radio" name="animal" value='fox' onChange={handleRadioAnimal} />
        </div>
        <Link onClick={handleSubmit} to={`/${station}/chat?animal=${animal}&arrival=${arrival}`}>
          <button type="submit">Next</button>
        </Link>
      </form>
    </div>
  )
}

export default Select
