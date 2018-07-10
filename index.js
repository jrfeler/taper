import React from 'react';
import Component from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import MainRouter from './src/routes.jsx'
import 'grommet/scss/grommet-core/index.scss';
import './src/stylesheets/main.scss';

class Layout extends React.Component {
  render() {
    return (
      <App centered={false}><MainRouter/></App>
    )
  }
}
ReactDOM.render(<Layout/>, document.getElementById('app'));
