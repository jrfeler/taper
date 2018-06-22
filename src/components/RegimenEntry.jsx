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
    var initToggle = [
      false, false, false, false
    ];
    for(var i=0; i < 4; i++) {
      if(this.props.doses[i] != 0) {
        initToggle[i]= true;
      }
    }
    this.state = {
      times: initToggle
    }
  }

  toggleDrugtime(ind) {
    var newState = this.state.times;
    newState[ind] = !newState[ind];
    var newStateDose = this.props.doses;
    newStateDose[ind] = 0;
    this.setState({times: newState})
    this.props.setDrugDose(this.props.drugIndex,newStateDose);
  }

  selectDrugDoseHandler(val) {
    var ind = parseInt(val.target.id);
    var newState = this.props.doses;
    newState[ind] = val.value;
    this.setState({doses: newState});
    this.props.setDrugDose(this.props.drugIndex,this.props.doses);
  }

  render() {

    return (
      <div>
      <Card contentPad={'medium'} className={'med-entry-card'}>
        <Title>
          {this.drugNames[this.props.drugIndex]}</Title>
        <Paragraph>When do you take this medication?</Paragraph>
        <Box direction={'row'} className="time-enter-container" justify={'between'}>
          <CheckBox label='Morning' checked={this.state.times[0]} onChange={() => this.toggleDrugtime(0)}/> {
            this.state.times[0]
              ? <Select id={0} placeHolder={'0'} options={this.doseData[this.props.drugIndex]} value={this.props.doses[0]} onChange={this.selectDrugDoseHandler.bind(this)}/>
              : null
          }
        </Box>
        <Box direction={'row'} className="time-enter-container" justify={'between'}>
          <CheckBox label='Noon' checked={this.state.times[1]} onChange={() => this.toggleDrugtime(1)}/> {
            this.state.times[1]
              ? <Select id={1} placeHolder={'0'} options={this.doseData[this.props.drugIndex]} value={this.props.doses[1]} onChange={this.selectDrugDoseHandler.bind(this)}/>
              : null
          }
        </Box>
        <Box direction={'row'} className="time-enter-container" justify={'between'}>
          <CheckBox label='Evening' checked={this.state.times[2]} onChange={() => this.toggleDrugtime(2)}/> {
            this.state.times[2]
              ? <Select id={2} placeHolder={'0'} options={this.doseData[this.props.drugIndex]} value={this.props.doses[2]} onChange={this.selectDrugDoseHandler.bind(this)}/>
              : null
          }
        </Box>
        <Box direction={'row'} className="time-enter-container" justify={'between'}>
          <CheckBox label='Night' checked={this.state.times[3]} onChange={() => this.toggleDrugtime(3)}/> {
            this.state.times[3]
              ? <Select id={3} placeHolder={'0'} options={this.doseData[this.props.drugIndex]} value={this.props.doses[3]} onChange={this.selectDrugDoseHandler.bind(this)}/>
              : null
          }
        </Box>
        <Button onClick={() => this.props.removeDrug(this.props.drugIndex)} label={'Remove'} primary={true}></Button>
        <Box justify={'end'}>
          <Paragraph>Total per day: {
              this.props.doses.reduce(function(acc, val) {
                return acc + val;
              })
            }</Paragraph>
        </Box>
      </Card>
    </div>)
  }
}
