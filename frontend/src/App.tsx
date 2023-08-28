import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Volunteer from './components/Volunteer.jsx';
import Table from './components/Table.jsx';
function App() {
  return (
    <Router>
      <Switch>
      <Route exact path='/' component={Table} />
      <Route exact path='/volunteer/:id' component={Volunteer} />
      </Switch>
    </Router>
  );
}

export default App;
