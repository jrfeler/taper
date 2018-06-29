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
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Section from 'grommet/components/Section';
import DateTime from 'grommet/components/DateTime'
import NumberInput from 'grommet/components/NumberInput';
import Close from 'grommet/components/icons/base/Close';
import FormAdd from 'grommet/components/icons/base/FormAdd';

export default class RegEntry extends React.Component {
  constructor(props) {
    super(props);
    this.drugNames = MedData.drugData;
    this.doseData = MedData.doseData;
    this.state = {
      doses: this.props.doses,
      nDoses: this.props.doses.length
    }
  }

  updateParentDose(dose) {
    this.props.updateDose(dose);
  }

  updateTime(time, ind) {
    var newDose = this.state.doses[ind];
    newDose.time = time;
    this.updateParentDose(newDose)
    var newDoseList = this.state.doses;
    newDoseList[ind] = newDose;
    this.setState({doses: newDoseList})
  }

  updatePillDose(dose, ind) {
    console.log(dose)
    var newDose = this.state.doses[ind];
    newDose.pillDose = dose.value;
    this.updateParentDose(newDose)
    var newDoseList = this.state.doses;
    newDoseList[ind] = newDose;
    this.setState({doses: newDoseList})
  }

  updateNPills(n, ind) {
    var newDose = this.state.doses[ind];
    newDose.nPills = n.target.value;
    this.updateParentDose(newDose)
    var newDoseList = this.state.doses;
    newDoseList[ind] = newDose;
    this.setState({doses: newDoseList})
  }

  deleteDose(index) {
    this.props.deleteDose(this.state.doses[index].key)
    // var newDoseList = this.state.doses;
    // newDoseList = newDoseList.splice(index,1);
    // this.setState({doses: newDoseList})
  }

  addDose() {
    var newDose = {
      key: this.props.keyMax + 1,
      med: this.props.medIndex,
      time: null,
      nPills: 1,
      pillDose: 5
    }
    this.props.addDose(newDose);
    var newDoseList = this.state.doses.concat(newDose);
    this.setState({doses: newDoseList})
  }

  generateDoseTable() {
    var rows = {};
    rows = this.state.doses.map((dose, index) => <TableRow key={index}>
      <td>
        <DateTime id={index + 'time'} format='h a' value={dose.time} onChange={(value) => this.updateTime(value, index)}></DateTime>
      </td>
      <td>
        <Select options={this.doseData[this.props.medIndex]} id={index + 'pillDose'} min={0} value={dose.pillDose} onChange={(value) => this.updatePillDose(value, index)}></Select>
      </td>
      <td>
        <NumberInput id={index + 'nPills'} value={dose.nPills} step={.5} onChange={(value) => this.updateNPills(value, index)}/>
      </td>
      <td className={'del-col'}>
        <Button icon={<Close/>} onClick={() => this.deleteDose(index)} disabled={this.state.doses.length < 2}></Button>
      </td>
    </TableRow>)

    var div = <Table responsive={true}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Pill Size</th>
          <th>Pill Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    return div;
  }
  render() {
    return (<Box flex={true} className={'med-entry-card'} pad={'medium'}>
      <Title>
        {this.drugNames[this.props.medIndex]}</Title>
      <Paragraph>Enter your regimen for taking this medication below:</Paragraph>
      <Section>
        <Box flex={true}>
          {this.generateDoseTable()}
        </Box>
      </Section>
      <Box flex={true} direction={'row'} justify={'between'}>
        <Button icon={<FormAdd/>} label={'Add Dose'} onClick={() => this.addDose()}></Button>

        <Button onClick={() => this.props.deleteMed(this.props.medIndex)} label={'Remove Med'} critical={true}></Button>
      </Box>
      <Box justify={'end'}></Box>
    </Box>)
  }
}
