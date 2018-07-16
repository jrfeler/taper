import React from 'react';
import Home from './views/home.jsx';
import MedEntry from './views/med_entry.jsx';
import MedEntry2 from './views/med_entry2.jsx';
import MedEntry3 from './views/med_entry3.jsx';
import Checkin from './views/checkin.jsx';
import Onboard from './views/onboard.jsx';
import Landing from './views/landing.jsx';
import {BrowserRouter, Link} from 'react-router-dom';
import {Route} from 'react-router';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box'
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Split from 'grommet/components/Split';
import Paragraph from 'grommet/components/Paragraph'
import CaretNext from 'grommet/components/icons/base/CaretNext';
import CaretPrevious from 'grommet/components/icons/base/CaretPrevious';

export default class MainRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSidebar: false
    }
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  renderMenuButton() {
    if(window.location.pathname==='/') {
      return null;
    }
    if (!this.state.showSidebar) {
      return <Button onClick={() => this.toggleSidebar()} label={'Menu'} icon={<CaretNext/>}></Button>
    } else {
      return <Button onClick={() => this.toggleSidebar()} label={'Menu'} icon={<CaretPrevious/>}></Button>
    }
  }

  renderMenu() {
    var div = null;
    if (this.state.showSidebar) {
      div = <Sidebar colorIndex='neutral-1' size='small'>
        <Header pad='medium' justify='between'>
          <Title>Taper App</Title>
        </Header>
        <Box flex='grow' justify='start'>

          <Menu primary={true}>
            <Link to={{
                pathname: '/home'
              }}>Home</Link>
            <Link to={{
                pathname: '/med_entry'
              }}>Med Entry</Link>
            <Link to={{
                pathname: '/med_entry2'
              }}>Med Entry V2</Link>
              <Link to={{
                  pathname: '/med_entry3'
                }}>Med Entry V3</Link>
            <Link to={{
                pathname: '/checkin'
              }}>Check In</Link>
            <Link to={{
                pathname: '/onboard'
              }}>Onboard</Link>
          </Menu>
        </Box>
        <Footer pad='medium'>
          <Paragraph>
            Created by Josh Feler and Patrick Liu
          </Paragraph>
        </Footer>
      </Sidebar>

    }
    return div;
  }
  render() {
    return (<BrowserRouter>
      <Split separator={true} flex='right' showOnResponsive={'both'}>
        {this.renderMenu()}
        <Box flex={'grow'}>
          <Box>
            <Header pad={'medium'}>

              {this.renderMenuButton()}

            </Header>
            <Route path='/med_entry' component={MedEntry}/>
            <Route path='/checkin' component={Checkin}/>
            <Route path='/med_entry2' component={MedEntry2}/>
            <Route path='/med_entry3' component={MedEntry3}/>
            <Route path='/onboard' component={Onboard}/>
            <Route path='/' exact={true} component={Landing}/>
            <Route path='/home' component={Home}/>
          </Box>
        </Box>
      </Split>
    </BrowserRouter>)
  }
};
