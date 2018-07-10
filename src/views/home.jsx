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
class Home extends React.Component {
  render() {
    return (<div>
      <Section pad={'medium'}>
        <h1>Landing Pages</h1>
      </Section>
      <Box align='start' flex={true} separator='vertical' pad={'medium'}>
        <Columns size='medium' maxCount={3} justify='start'>
          <Box align='start' pad='medium' colorIndex='light-2' className={'gen-card'} alignContent={'stretch'}>
            <Label>
              From your last visit on 9/9/99:</Label>
            <h2>
              Med Regimen
            </h2>

            <List className={'home-medlist'}>
              <ListItem justify={'between'}>
                <b>Oxycodone</b>
                <span>5mg at 8AM</span>
              </ListItem>
              <ListItem justify={'between'}>
                <span></span>
                <span>5mg at 8PM</span>
              </ListItem>
              <ListItem justify={'between'}>
                <b>Hydromorphone</b>
                <span>25mg at 10AM</span>
              </ListItem>
            </List>

            <Box alignContent={'end'} alignSelf={'end'} flex={true} pad={'small'}>
              <Button label={'New Regimen'} icon={<CaretNext/>} href={'/med_entry2'} primary={true}></Button>
            </Box>
          </Box>
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
          <Box align='center' pad='medium' margin='small' colorIndex='light-2'>
            Box 4
          </Box>

        </Columns>
      </Box>
    </div>);
  }
}

export default Home;
