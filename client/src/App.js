import React, {useState} from 'react';
// import 'antd/dist/antd.css';
import './styles/css/font.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Start from './pages/Start';
import Select from './pages/Select';
import Chat from './pages/Chat';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

const App = () => {
  const [result, setResult] = useState([]);
  const [choices, setChoices] = useState([]);

  return (
    <Router>
      <Route path="/:station" exact component={Start} />
      <Route path="/:station/select" component={Select} />
      <Route path="/:station/chat" component={Chat} />
      <Route path="/:station/quiz" render={props => (<Quiz {...props} setResult={setResult} setChoices={setChoices}/>)} />
      <Route path="/:station/result" render={props => (<Result {...props} result={result} choices={choices}/> )} />
    </Router>
  )
}



export default App;