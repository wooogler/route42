import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Start from './pages/Start';
import Select from './pages/Select';
import Chat from './pages/Chat';
import Quiz from './pages/Quiz';

const App = () => {
  return (
    <Router>
      <Route path="/:station" exact component={Start} />
      <Route path="/:station/select" component={Select} />
      <Route path="/:station/chat" component={Chat} />
      <Route path="/:station/quiz" component={Quiz} />
    </Router>
  )
}

export default App;