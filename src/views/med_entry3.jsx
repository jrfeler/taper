import React from 'react';
import Component from 'react';
import Header from 'grommet/components/Header'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Title from 'grommet/components/Title'
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
import RegimenEntry3 from '../components/RegimenEntry3.jsx'
import FormField from 'grommet/components/FormField'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'
import Animate from 'grommet/components/Animate';
import Label from 'grommet/components/Label'
import NumberInput from 'grommet/components/NumberInput'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'

import Select from 'react-select'

import * as MedData from '../med_data.js'

export default class MedEntry3 extends React.Component {
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
      pDayList: [],
      taperPace: -1,
      firstDose: -1,
      taperDoses: [
        []
      ],
      keyMax: 0,
      chips: [],
      chipPlaceholder: "Begin typing medication names here:",
      step: 0
    }
    this.medListRend = [];
    this.medListChecks = [];

    this.addDose = this.addDose.bind(this);
    this.updateDose = this.updateDose.bind(this);
    this.deleteDose = this.deleteDose.bind(this);
    this.deleteMed = this.deleteMed.bind(this);
    this.chipChange = this.chipChange.bind(this);
  }

  deleteMed(medInd) {
    var newDoseList = this.state.doseList.filter((dose) => dose.med != medInd);
    var newMedList = this.state.medList.filter(med => med != medInd);
    this.setState({doseList: newDoseList, medList: newMedList});
  }

  chipChange(chips) {
    var placeHolder = chips.length < 1
      ? 'Begin typing medication names here:'
      : 'Continue typing other medication names here:';
      if(chips.length < this.state.chips.lenght) {
        //chip remove
        var removed = this.state.chips.filter(x => !chips.includes(x));
        this.deleteMed(removed.value)

      } else {
        //chip added, no need to edit dose list
      }
    this.setState({chips: chips, chipPlaceholder: placeHolder})
  }

  generateMedSelectList() {
    var div = null;
    div = this.drugNames.map((med) => <CheckBox key={med} id={'drug' + med} value={med.toString()} label={med.toString()} onChange={() => this.setFirstMed(med)}/>)
    return <Columns>{div}</Columns>;
  }

  setKeyMax() {
    this.setState({
      keyMax: this.state.keyMax + 1
    });
  }

  addDose(dose) {
    var newDoseList = this.state.doseList.concat(dose);
    this.setState({doseList: newDoseList, keyMax: dose.key})
  }

  initDose(medIndex) {
    var dose = {
      key: this.state.keyMax + 1,
      med: medIndex,
      time: null,
      nPills: 0,
      pillDose: 0
    }
    this.addDose(dose);
    this.setKeyMax();
  }

  deleteDose(key) {
    var newDoseList = this.state.doseList;
    for (var i = 0; i < newDoseList.length; i++) {
      if (newDoseList[i]['key'] === key) {
        newDoseList = newDoseList.splice(i, 1);
      }
    }
    this.setState({doseList: newDoseList})
  }

  updateDoseCount(val) {
    var med = parseInt(val.target.name.slice(4));
    var dosesOfDrug = this.state.doseList.filter(dose => dose.med === med);
    if(val.target.valueAsNumber>dosesOfDrug.length) {
      this.initDose(med);
    }
    else {
      this.deleteDose(dosesOfDrug[dosesOfDrug.length-1].key)
    }
  }

  generateDoseDayInput() {
    var div = null;
    div = this.state.chips.map((med) => <Box direction={'column'} key={'pdaybox' + med.label}>
      <Paragraph>{med.label}</Paragraph>
      <NumberInput id={'pday' + med.label} min={0} name={'pday' + med.value} value={this.state.doseList.filter(dose=> dose.med===med.value).length} step={1} onChange={(val) => this.updateDoseCount(val)}></NumberInput>
    </Box>)
    return <Box>{div}</Box>
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

  generateRegEntryCards() {
    var div = null;
    if (this.state.doseList.length > 0) {
      div = this.state.chips.map((med, index) => <RegimenEntry3 key={index} medIndex={med.value} doses={this.state.doseList.filter(dose => dose.med === med.value)} updateDose={this.updateDose}></RegimenEntry3>)
      return (<Columns justify={'start'} responsive={true} size={'large'}>
        {div}
      </Columns>);
    } else {
      return div;
    }
  }





  generateRegimenSummary() {
    var div = this.state.chips.length >= 1
      ? this.state.chips.map((med) => <div>
      <Paragraph>{med.label}</Paragraph>
      <List className={'home-medlist'}>

        {this.state.doseList.filter(dose=> dose.med === med.value).map((dose) => <ListItem>{dose.nPills} x {dose.pillDose} mg tabs at {dose.time}</ListItem>)}
      </List></div>
    )
      : <Label className={'warn-text'}>As you enter you medication schedule, it will appear here so that you can review it.</Label>
    return <Box>{div}</Box>;
  }

  openPillIdentifierTab() {
    window.open('https://pillbox.nlm.nih.gov/pillimage/search.php', '_blank');
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1
    })
  }

  lastStep() {
    this.setState({
      step: this.state.step - 1
    })
  }

  render() {
    return (

      <div>
      <Section pad={'medium'}>
        <h1>Medication Entry</h1>
        <Paragraph>In this page, you will enter all the information about your pain medications, including how much you take and when.</Paragraph>
      </Section>
      <Columns size={'large'} justify={'between'}>
        <Box>
          <Animate visible={this.state.step === 0} enter={{
              "animation" : "fade",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>

            <Box justify={'start'} margin={'medium'}>
              <Box justify={'between'}>
                <Title>Select Your Medications</Title>
                <Paragraph>If you take multiple opioid medications, please include all of them. To enter a second medication, begin typing the name of the second medication after entering the first.</Paragraph>
              </Box>
              <Button onClick={() => this.openPillIdentifierTab()} label={'What is this pill?'} box={true} alignSelf={'end'} primary={true} margin={'small'}></Button>
              <Select value={this.state.chips} multi={true} options={this.drugOptions} onChange={this.chipChange} suggestions={this.drugNames} placeholder={this.state.chipPlaceholder}/>

            </Box>

            <Box justify={'start'} margin={'medium'}>
              <Title>
                Select All Your Medications
              </Title>
              <Paragraph>If you take multiple opioid medications, please click each of them.</Paragraph>
              <Button onClick={() => this.openPillIdentifierTab()} label={'What is this pill?'} box={true} alignSelf={'end'} primary={true} margin={'small'}></Button>
              {this.generateMedSelectList()}
            </Box>
          </Animate>
          <Animate visible={this.state.step === 1} enter={{
              "animation" : "fade",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>
            <Box margin={'medium'}>
              <Paragraph>Enter How many times you take each medication per day</Paragraph>
              {this.generateDoseDayInput()}
            </Box>
          </Animate>
          <Animate visible={this.state.step === 2} enter={{
              "animation" : "fade",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>
            <Paragraph>Enter specifics of each dose</Paragraph>
            <Box>
              {this.generateRegEntryCards()}
            </Box>
          </Animate>

          <Box direction={'row'}>
            <Button onClick={() => this.lastStep()} label={'Last'}></Button>
            <Button onClick={() => this.nextStep()} label={'Next'}></Button>
          </Box>

        </Box>
        <Box className={'gen-card'} margin={'medium'} pad={'medium'}>

          <h2>Med Regimen</h2>
          {this.generateRegimenSummary()}
        </Box>
      </Columns>

    </div>);
  }
}
