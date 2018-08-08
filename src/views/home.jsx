import React from 'react';
import Component from 'react'
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Button from 'grommet/components/Button'
import Paragraph from 'grommet/components/Paragraph'
import Columns from 'grommet/components/Columns'
import Label from 'grommet/components/Label'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Chart, {Axis, Line, Base, Grid, Layers} from 'grommet/components/chart/Chart';
import Legend from 'grommet/components/Legend'
import MedSummary from '../components/MedSummary.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    var dummyDoseList = [
      {
        key: 1,
        med: 1,
        time: '8 am',
        nPills: 2,
        pillDose: 10,
          dateEntered: '3/14/2018'
      }, {
        key: 2,
        med: 2,
        time: '8 pm',
        nPills: 2,
        pillDose: 10,
        dateEntered: '3/14/2018'
      }
    ];
    var dummyMedList = [
      {
        value: 1,
        label: 'Hydromorphone'
      }, {
        value: 2,
        label: 'Oxycodone'
      }
    ];

    this.state = {
      doseList: dummyDoseList,
      medList: dummyMedList
    }
    this.updateDose = this.updateDose.bind(this);

  }
  updateDose(dose) {
    var newDoseList = this.state.doseList;
    for (var i = 0; i < newDoseList.length; i++) {
      if (newDoseList[i].key === dose.key) {
        newDoseList[i] = dose;
      }
    }
    this.setState({doseList: newDoseList})
  }

  render() {
    return (<div>
      <Section pad={'medium'}>
        <h1>Landing Pages</h1>
      </Section>
      <Box padding={'medium'} alignContent={'stretch'} alignSelf={'stretch'}>
        <Button label={'Complete checkin.'} href={'/taper/#/checkin'} box={true} margin={'medium'} primary={'true'}></Button>
      </Box>
      <Box align='start' flex={true} separator='vertical' pad={'medium'}>
        <Columns size='medium' maxCount={3} justify='start'>
          <MedSummary doseList={this.state.doseList} medList={this.state.medList} updateable={false} updateDose={this.updateDose}></MedSummary>

          <Box align='start' pad='medium' colorIndex='light-2' className={'gen-card'}>
            <Label>Since enrolling in LIMIT Study:</Label>
            <h2>
              Taper History
            </h2>
            <Chart full={true}>
              <Axis count={5} labels={[
                  {
                    "index": 2,
                    "label": "50"
                  }, {
                    "index": 4,
                    "label": "100"
                  }
                ]} vertical={true} ticks={false}/>
              <Chart full={true} vertical={true}>
                <Base height='small' width='medium'/>

                <Axis count={2} labels={[
                    {
                      "index": 0,
                      "label": "Mar 2018"
                    }, {
                      "index": 1,
                      "label": "Feb 2018"
                    }
                  ]} ticks={true}/>

                <Layers>
                  <Grid rows={6} columns={1}/>
                  <Line values={[
                      80,
                      80,
                      80,
                      80,
                      75,
                      70,
                      60,
                      55,
                      15,
                      40,
                      50
                    ]} colorIndex='graph-5' points={true}/>
                  <Line values={[
                      20,
                      15,
                      10,
                      10,
                      5,
                      5,
                      5,
                      0,
                      0,
                      0,
                      0
                    ]} colorIndex='accent-2' points={true}/>
                </Layers>
              </Chart>
              <Legend series={[
                  {
                    "label": "Oxycodone",
                    "colorIndex": "graph-1"
                  }, {
                    "label": "Hydromorphone",
                    "colorIndex": "accent-2"
                  }
                ]}/>
            </Chart>
          </Box>
          <Box align='start' pad='medium' colorIndex='light-2' className={'gen-card'}>
            <Label>Since enrolling in LIMIT Study:</Label>
            <h2>
              Pain & Depression History
            </h2>
            <Chart full={true}>
              <Axis count={5} labels={[
                  {
                    "index": 2,
                    "label": "5"
                  }, {
                    "index": 4,
                    "label": "10"
                  }
                ]} vertical={true} ticks={false}/>
              <Chart full={true} vertical={false}>

                <Base height='small' width='medium'/>
                <Axis count={2} labels={[
                    {
                      "index": 0,
                      "label": "Mar 2018"
                    }, {
                      "index": 1,
                      "label": "Feb 2018"
                    }
                  ]} ticks={true}/>
                <Layers>
                  <Grid rows={6} columns={1}/>
                  <Line values={[
                      7,
                      6,
                      7,
                      8,
                      5,
                      6,
                      7,
                      6,
                      6,
                      6,
                      6
                    ]} colorIndex='graph-5' points={true} max={10}/>
                  <Line values={[
                      4,
                      5,
                      6,
                      6,
                      5,
                      3,
                      5,
                      3,
                      4,
                      5,
                      6
                    ]} colorIndex='accent-2' points={true} max={10}/>

                  <Line values={[
                      2,
                      2,
                      1,
                      1,
                      2,
                      3,
                      3,
                      1,
                      2,
                      1,
                      1
                    ]} colorIndex='accent-2' points={true} max={10}/>
                </Layers>

                <Legend series={[
                    {
                      "label": "Pain Scale",
                      "colorIndex": "graph-1"
                    }, {
                      "label": "ADL Scale",
                      "colorIndex": "accent-2"
                    }, {
                      "label": "PSQ-9",
                      "colorIndex": "accent-1"
                    }
                  ]}/>
              </Chart>

            </Chart>
          </Box>
          <Box align='start' pad='medium' margin='small' colorIndex='light-2' className={'gen-card'}>
            <h2>
              Your Questions to the Expert
            </h2>
            <Label className={'subtitle'}>Answered questions shown in green. Click to see response.</Label>
            <List className={'expert-questions'}>
              <ListItem direction={'column'}>

                <Paragraph className={'question answered'}>It's really hard to stay focused at work, and I am getting called out on it. What can I do?</Paragraph>
                <Paragraph className={'answer-author'}>Answered by Dr. William Becker</Paragraph>
              </ListItem>

              <ListItem>
                <Paragraph className={'question'}>
                  I have finished tapering my first med. Do I need to do anything special before tapering the second?
                </Paragraph>
              </ListItem>
            </List>
          </Box>

        </Columns>
      </Box>
    </div>);
  }
}

export default Home;
