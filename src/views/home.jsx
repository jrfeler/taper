import React from 'react';
import Component from 'react';
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Button from 'grommet/components/Button'
import Paragraph from 'grommet/components/Paragraph'


class Home extends React.Component {
   render() {
      return (
        <div>

            <h1>Landing Pages</h1>

        <Box align='center' flex={true} separator='vertical'>
          <Paragraph>Whatever goes on the home page... probably some sort of summary of patient's taper protocol?</Paragraph>
         </Box>
         </div>
      );
   }
}

export default Home;
