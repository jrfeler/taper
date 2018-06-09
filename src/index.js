import React from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import MainRouter from './routes.jsx'
import 'grommet/scss/grommet-core/index.scss';
import './stylesheets/main.scss';
import _ from 'lodash';


class Layout extends React.Component {
  render() {
    return(
      <App centered={true}><MainRouter/></App>)
  
      }
}

ReactDOM.render(<Layout />, document.getElementById('app'));
