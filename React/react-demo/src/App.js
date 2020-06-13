import React from 'react';
import './App.css';
import ListItem from './components/listItem'
import {Route} from 'react-router-dom'

function App() {
  return (
    <div className="container">
      <ListItem/>
    </div>
  );
}

class App extends Component {
  render() { 
    return ( 
      <div>
        <Switch>
          <Route path='/aa' component='aa' />
          <Route path='/' component='Home' />
        </Switch>
      </div>
     );
  }
}
 
export default App;
