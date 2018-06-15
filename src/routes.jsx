import React from 'react';
import Home from './views/home.jsx';
import MedEntry from './views/med_entry.jsx';
import Checkin from './views/checkin.jsx';
import {BrowserRouter, Link} from 'react-router-dom';
import {Route} from 'react-router';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box'

const MainRouter = () => (<BrowserRouter>
  <div>

    <div className="route-btn-container">
      <Header className='header-bar'>
        <Box flex={true} direction={'row'} justify={'between'} pad={'medium'} align={'center'}>
        <Title>Bup App</Title>
        <Box className='route-btn-container' flex={true} direction={'row'} justify={'end'} align={'center'}>

      <Link to={{
          pathname: '/med_entry'
        }}>Med Entry</Link>
      <Link to={{
          pathname: '/'
        }}>Home</Link>
      <Link to={{
          pathname: '/checkin'
        }}>Check In</Link>
    </Box>
        </Box>
    </Header>
    </div>
    <div>
      <Route path='/med_entry' component={MedEntry}/>
      <Route exact={true} path='/' component={Home}/>
      <Route path='/checkin' component={Checkin}/>
    </div>
  </div>
</BrowserRouter>);

export default MainRouter;
