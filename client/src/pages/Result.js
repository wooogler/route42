import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import {useHistory} from 'react-router-dom';

const Result = ({location, match, result}) => {
  const {station} = match.params;
  let history = useHistory();
  const [animal, setAnimal] = useState('');
  const [arrival, setArrival] = useState('');

  useEffect(() => {
    const {animal, arrival} = queryString.parse(location.search);  
    setArrival(arrival);
    setAnimal(animal);    
  }, [location.search])

  return (
    <div>
      {
        result.map((item, index) => <div key={index}>{item}</div>)
      }
      <div>{result.length*10}% 일치</div>
    </div>
  )
}

export default Result;
