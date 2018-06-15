import React from 'react';
import Component from 'react';
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Button from 'grommet/components/Button'


class Home extends React.Component {
   render() {
      return (
        <div>
        
            <h1>Check In</h1>

        <Button  critical={true} label='Enter New Med'/>
        <Box align='center' flex={true} separator='vertical'>
         </Box>
         </div>
      );
   }
}

export default Home;
