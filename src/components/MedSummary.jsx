import React from 'react';
import Component from 'react';
import * as MedData from '../med_data.js'
import Paragraph from 'grommet/components/Paragraph';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import TableRow from 'grommet/components/TableRow';
import Table from 'grommet/components/Table';
import DateTime from 'grommet/components/DateTime';
import Select from 'grommet/components/Select';
import NumberInput from 'grommet/components/NumberInput';
import Label from 'grommet/components/Label';

export default class MedSummary extends React.Component {
  constructor(props) {
    super(props);
    this.drugNames = MedData.drugData;
    this.doseData = MedData.doseData;
    this.state = {
      doseList: this.props.doseList,
      medList: this.props.medList,
      showDoseUpdater: false,
      doseIndexToUpdate: -1
    }
  }

  toggleDoseUpdater(dose, index) {
    this.setState({
      showDoseUpdater: !this.state.showDoseUpdater,
      doseIndexToUpdate: index,
      doseToUpdate: dose
    })
  }

  updateParentDose(dose) {
    this.props.updateDose(dose);
  }

  updateTime(time, ind) {
    var newDose = this.state.doseList[ind];
    newDose.time = time;
    this.updateParentDose(newDose)
    var newDoseList = this.state.newDoseList;
    newDoseList[ind] = newDose;
    this.setState({doseList: newDoseList})
  }

  updatePillDose(dose, ind) {
    var newDose = this.state.doseList[ind];
    newDose.pillDose = dose.value;
    this.updateParentDose(newDose)
    var newDoseList = this.state.doseList;
    newDoseList[ind] = newDose;
    this.setState({doseList: newDoseList})
  }

  updateNPills(n, ind) {
    var newDose = this.state.doseList[ind];
    newDose.nPills = n.target.valueAsNumber;
    this.updateParentDose(newDose)
    var newDoseList = this.state.doseList;
    newDoseList[ind] = newDose;
    this.setState({doseList: newDoseList})
  }

  generateDoseEditor() {
    var row = null;
    row = (<TableRow>
      <td>
        <DateTime id={this.state.doseIndexToUpdate + 'time'} format='h a' value={this.state.doseToUpdate.time} onChange={(value) => this.updateTime(value, this.state.doseIndexToUpdate)}></DateTime>
      </td>
      <td>
        <Select options={MedData.doseData[this.state.doseToUpdate.med]} id={this.state.doseIndexToUpdate + 'pillDose'} min={0} value={this.state.doseToUpdate.pillDose} onChange={(value) => this.updatePillDose(value, this.state.doseIndexToUpdate)}></Select>
      </td>
      <td>
        <NumberInput id={this.state.doseIndexToUpdate + 'nPills'} value={this.state.doseToUpdate.nPills} step={.5} onChange={(value) => this.updateNPills(value, this.state.doseIndexToUpdate)} min={0}/>
      </td>
      <td>{this.state.doseToUpdate.nPills * this.state.doseToUpdate.pillDose}</td>
    </TableRow>);

    var div = <Table responsive={true}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Pill Size</th>
          <th>Pill Number</th>
          <th>Dose in mg</th>
        </tr>
      </thead>
      <tbody>{row}</tbody>
    </Table>

    return div;
  }

  render() {
    var div = (<Box className={'gen-card'} pad={'medium'}>
    {this.props.updateable?<Label>Click on a row to edit information: </Label> : null}
      {

        this.state.medList.map((med, index) => <div key={index}>
          <Paragraph>{med.label}</Paragraph>
          <List className={'home-medlist'}>
            {
              this.state.doseList.filter(dose => dose.med === med.value).map((dose, ind) => <ListItem key={dose.key} onClick={this.props.updateable
                  ? () => this.toggleDoseUpdater(dose, ind)
                  : null}>{dose.nPills}
                x {dose.pillDose}
                mg tabs at {dose.time}</ListItem>)
            }
          </List>
        </div>)
      }
      {
        this.state.showDoseUpdater
          ? <Layer overlayClose={true} closer={true} onClose={() => this.toggleDoseUpdater()}>
              <Article>
                {this.generateDoseEditor()}
              </Article>
            </Layer>
          : null
      }
    </Box>);

    return <Box>{div}</Box >;

  }

}
