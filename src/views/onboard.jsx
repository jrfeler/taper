import React from 'react';
import Component from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import NumberInput from 'grommet/components/NumberInput';
import Layer from 'grommet/components/Layer';
import Article from 'grommet/components/Article';
import CheckBox from 'grommet/components/CheckBox';
import Title from 'grommet/components/Title';
import Tab from 'grommet/components/Tab';
import Tabs from 'grommet/components/Tabs';

export default class Onboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doses: 0
    }
  }
  render() {
    return (<div>
      <Section pad={'medium'}>
        <h1>Welcome</h1>
        <Paragraph>The LIMIT trial is meant to help veterans decrease their use of opioid-based pain medicaitons over the long term.</Paragraph>
      </Section>
      <Box pad={'medium'}>
        <Tabs justify={'start'}>
          <Tab title='Why should I taper?'>
            <Paragraph>
              This section will contain info on why it is important to taper.
            </Paragraph>

          </Tab>
          <Tab title='How do I start to taper?'>
            <Paragraph>
              This section contains info on LIMIT .
            </Paragraph>

          </Tab>
        </Tabs>
      </Box>
    </div>)
  }
}
