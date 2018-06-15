import React from 'react';
import Component from 'react';
import CheckBox from 'grommet/components/CheckBox';
import Paragraph from 'grommet/components/Paragraph';
import Select from 'grommet/components/Select';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Button from 'grommet/components/Button';
import * as MedData from '../med_data.js';
import Title from 'grommet/components/Title';

export default class RegimenEntry extends React.Component {
  constructor(props) {
    super(props);
    this.drugNames = MedData.drugData;
    this.doseData = MedData.doseData;

    this.state = {
      drugIndex: this.props.drugIndex,
      times: [
        false, false, false, false
      ],
      doses: [0, 0, 0, 0]
    }
  }

  toggleDrugtime(ind) {
    var newState = this.state.times;
    newState[ind] = !newState[ind];
    var newStateDose = this.state.doses;
    newStateDose[ind] = 0;
    this.setState({times: newState, doses: newStateDose})
  }

  setDrugDose(val) {
    var ind = parseInt(val.target.id);
    var newState = this.state.doses;
    newState[ind] = val.value;
    this.setState({doses: newState});
  }

  render() {
    return (<div>
      <Card contentPad={'medium'} className={'med-entry-card'}>
        <Title>
          {this.drugNames[this.state.drugIndex]}</Title>
        <Paragraph>When do you take this medication?</Paragraph>
        <Box direction={'row'} className="time-enter-container" justify={'between'}>
          <CheckBox label='Morning' value={this.state.times[0]} onClick={() => this.toggleDrugtime(0)}/> {
            this.state.times[0]
              ? <Select id={0} placeHolder={'0'} options={this.doseData[this.state.drugIndex]} value={this.state.doses[0]} onChange={this.setDrugDose.bind(this)}/>
              : null
          }
        </Box>
        <Box direction={'row'} className="time-enter-container" justify={'between'}>
          <CheckBox label='Noon' value={this.state.times[1]} onClick={() => this.toggleDrugtime(1)}/> {
            this.state.times[1]
              ? <Select id={1} placeHolder={'0'} options={this.doseData[this.state.drugIndex]} value={this.state.doses[1]} onChange={this.setDrugDose.bind(this)}/>
              : null
          }
        </Box>
        <Box direction={'row'} className="time-enter-container" justify={'between'}>
          <CheckBox label='Evening' value={this.state.times[2]} onClick={() => this.toggleDrugtime(2)}/> {
            this.state.times[2]
              ? <Select id={2} placeHolder={'0'} options={this.doseData[this.state.drugIndex]} value={this.state.doses[2]} onChange={this.setDrugDose.bind(this)}/>
              : null
          }
        </Box>
        <Box direction={'row'} className="time-enter-container" justify={'between'}>
          <CheckBox label='Night' value={this.state.times[3]} onClick={() => this.toggleDrugtime(3)}/> {
            this.state.times[3]
              ? <Select id={3} placeHolder={'0'} options={this.doseData[this.state.drugIndex]} value={this.state.doses[3]} onChange={this.setDrugDose.bind(this)}/>
              : null
          }
        </Box>
        <Button onClick={() => this.props.removeDrug(this.state.drugIndex)} label={'Remove'} primary={true}></Button>
        <Box justify={'end'}>
          <Paragraph>Total per day: {
              this.state.doses.reduce(function(acc, val) {
                return acc + val;
              })
            }</Paragraph>
        </Box>
      </Card>
    </div>)
  }
}
