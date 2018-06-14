import React from 'react';
import Home from './views/home.jsx';
import MedEntry from './views/med_entry.jsx'
import {BrowserRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Route} from 'react-router';

const MainRouter = () =>
(<BrowserRouter>
  <div>
  <div>
    <Link to={{pathname:'/med_entry'}}>Med Entry</Link>
    <Link to={{pathname:'/'}}>Home</Link>
  </div>
  <div>
    <Route  path='/med_entry' component={MedEntry}/>
    <Route exact path='/' component={Home}/>
  </div>
  </div>
</BrowserRouter>);

export default MainRouter;
