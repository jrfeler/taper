import React from 'react';
import Component from 'react';
import Header from 'grommet/components/Header'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Title from 'grommet/components/Title'
import Select from 'grommet/components/Select'
import Paragraph from 'grommet/components/Paragraph'
import Headline from 'grommet/components/Headline'
import Footer from 'grommet/components/Footer'
import CheckBox from 'grommet/components/CheckBox';
import Columns from 'grommet/components/Columns'
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import Button from 'grommet/components/Button'
import RadioButton from 'grommet/components/RadioButton'
import RegEntry from '../components/RegEntry.jsx'
import FormField from 'grommet/components/FormField'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'
import * as MedData from '../med_data.js'

export default class MedEntry2 extends React.Component {
  constructor(props) {
    super(props);
    this.drugNames = MedData.drugData;
    this.drugOptions = [
      {
        "value": 0,
        "label": 'Morphine Extended Release'
      }, {
        'value': 1,
        'label': 'Morphine Immediate Release'
      }, {
        'value': 2,
        'label': 'Oxycodone Immediate Release'
      }, {
        'value': 3,
        'label': 'Oxycodone Extended Release'
      }, {
        'value': 4,
        'label': 'Oxycodone/Acetaminophen Immediate Release'
      }, {
        'value': 5,
        'label': 'Hydrocodone/Acetaminophen'
      }, {
        'value': 6,
        'label': 'Hydromorphone'
      }, {
        'value': 7,
        'label': 'Methadone'
      }, {
        'value': 8,
        'label': 'Fentanyl Transdermal Patch'
      }, {
        'value': 9,
        'label': 'Tramadol'
      }, {
        'value': 10,
        'label': 'Codeine/Acetaminophen'
      }, {
        'value': 11,
        'label': 'Codeine'
      }
    ];
    this.state = {
      doseList: [],
      medList: [],
      taperPace: -1,
      firstDose: -1,
      taperDoses: [
        []
      ],
      keyMax: 0
    }
    this.medListRend = [];
    this.medListChecks = [];

    this.addDose = this.addDose.bind(this);
    this.updateDose = this.updateDose.bind(this);
    this.deleteDose = this.deleteDose.bind(this);
    this.deleteMed = this.deleteMed.bind(this);
  }

  setDrugChoice(val) {
    var newMedList = null;
    var newDoseList = null;
    if (!this.state.medList.includes(val)) {
      newMedList = this.state.medList.concat(val);
      var dose = {
        key: this.state.keyMax + 1,
        med: val,
        time: null,
        nPills: 1,
        pillDose: 5
      }
      newDoseList = this.state.doseList.concat(dose);
    } else {
      newMedList = this.state.medList;
      newMedList.splice(newMedList.indexOf(val), 1);
      newDoseList = this.state.doseList.filter(dose => dose.med != val);
    }

    var newFirstMed = null;
    if(newMedList.length ===1) {
        newFirstMed = val;
    }
    else  {
      newFirstMed = -1;
    }


    this.setState({medList: newMedList, doseList: newDoseList, firstMed:newFirstMed});
  };

  setKeyMax() {
    this.setState({
      keyMax: this.state.keyMax + 1
    });
  }

  deleteMed(medInd) {
    var newDoseList = this.state.doseList.filter((dose) => dose.med != medInd);
    var newMedList = this.state.medList.filter(med => med != medInd);
    this.setState({doseList:newDoseList, medList: newMedList});
  }

  medSelectHandler(e) {
    this.setDrugChoice(e.value.value);
  };

  updateDose(dose) {
    var newDoseList = this.state.doseList;
    for (var i = 0; i < newDoseList.length; i++) {
      if (newDoseList[i].key === dose.key) {
        newDoseList[i] = dose;
      }
    }
    this.setState({doseList: newDoseList})
  }

  addDose(dose) {
    var newDoseList = this.state.doseList.concat(dose);
    this.setState({doseList: newDoseList, keyMax: dose.key})
  }

  deleteDose(key) {
    var newDoseList = this.state.doseList;
    for (var i = 0; i < newDoseList.length; i++) {
      if (newDoseList[i]['key'] === key) {
        newDoseList.splice(i, 1);
      }
    }
    this.setState({doseList: newDoseList})
  }

  generateRegEntryCards() {
    var div = null;
    if (this.state.doseList.length > 0) {
      div = this.state.medList.map((med, index) => <RegEntry key={index} keyMax={this.state.keyMax} medIndex={med} doses={this.state.doseList.filter(dose => dose.med === med)} updateDose={this.updateDose} addDose={this.addDose} deleteDose={this.deleteDose} deleteMed={this.deleteMed}></RegEntry>)
      return (<Columns justify={'start'} responsive={true} size={'large'}>
        {div}
      </Columns>);
    } else {
      return div;
    }
  }


  setFirstMed(ind) {
    this.setState({firstMed:ind});
  }

  generateFirstMedSelect(selected) {
    if(typeof select === 'undefined') {
      selected = this.state.firstMed;
    }
    var buttons = this.state.medList.map((med) => <RadioButton key={med} id={'drug' + med} value={med.toString()} label={this.drugNames[med]} checked={selected === med} onChange={() => this.setFirstMed(med)}/>)
    return (<FormField >{buttons}</FormField>)
  }
  setFirstDose(key) {
    this.setState({firstDose:key})
  }

  generateFirstDoseSelect(selected) {
    if(typeof select === 'undefined') {
      selected = this.state.firstDose;
    }
    console.log(this.state.doseList);
    var relDoses =  this.state.doseList.filter(dose=>dose.med===this.state.firstMed);
    console.log(relDoses);
    var buttons =relDoses.map((dose) => <RadioButton key={dose.key} id={'drug' + dose.key} value={dose.time} label={dose.time} checked={selected === dose.key} onChange={() => this.setFirstDose(dose.key)}/>)
    return(<FormField>{buttons}</FormField>)
  }

  render() {
    return (<div>
      <Header>
        <h1>Medication Entry</h1>
      </Header>
      <Section >
        <Box pad='medium' justify={'start'}>
          <Title>
            Select Your Medications
          </Title>
          <Select placeHolder={'Click to Select Medications'} options={this.drugOptions} value={this.state.medList} onChange={this.medSelectHandler.bind(this)}/>
        </Box>
      </Section>
      <Section>
        {this.generateRegEntryCards()}
      </Section>
      {this.state.medList.length > 1
          ? <Section>

              <Box pad='medium' justify={'start'}>
                <Title>
                  Which medication would you like to taper first?
                </Title>
                <Paragraph>We recommend beginning with long-acting medications.</Paragraph>
                {this.generateFirstMedSelect()}

              </Box>
            </Section>
          : null
      }
      {
        this.state.firstMed > -1 && this.state.medList.length > 0 && this.state.doseList.length>1
          ? <Section>

              <Box pad='medium' justify={'start'}>
                <Title>
                  Which dose would you like to start tapering first?
                </Title>
                <Paragraph> There is no right answer here. If you have trouble sleeping due to pain, you might choose to decrease a dose other than your evening dose first.</Paragraph>
                {this.generateFirstDoseSelect()}

              </Box>
            </Section>
          : null
      }

    </div>);
  }
}
