import React from 'react';
import Card  from 'grommet/components/Card';
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Button from 'grommet/components/Button'


class Home extends React.Component {
   render() {
      return (
        <div>
        <Header fixed={true}><h1>Bup App</h1></Header>
        <Button  critical={true} label='Enter New Med'/>
        <Box align='center' flex={true} separator='vertical'>
         <Card
           contentPad='medium'
           label='this that the other'
           heading='heading'
           thumbnail='https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3.jpg'
           description='description'/>
           <Card
             contentPad='medium'
             label='this that the other'
             heading='heading'
             thumbnail='https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3.jpg'
             description='description'/>
         </Box>
         </div>
      );
   }
}

export default Home;
