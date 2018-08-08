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
import Notification from 'grommet/components/Notification'
import MedSummary from '../components/MedSummary.jsx';

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
      step: 0,
      showCompNotification: false,
      continueNotificationText: 'Please select a medication before continuing.'
    }
    this.medListRend = [];
    this.medListChecks = [];

    this.addDose = this.addDose.bind(this);
    this.updateDose = this.updateDose.bind(this);
    this.deleteDose = this.deleteDose.bind(this);
    this.deleteMed = this.deleteMed.bind(this);
  }

  deleteMed(medInd) {
    var newDoseList = this.state.doseList.filter((dose) => dose.med != medInd);
    var newMedList = this.state.medList.filter(med => med.value != medInd);
    this.setState({doseList: newDoseList, medList: newMedList});
  }

  toggleMed(med) {
    if (this.state.medList.includes(med)) {
      this.deleteMed(med.value)
    } else {
      var newMedList = this.state.medList.concat(med);
      this.initDose(med.value);
      this.setState({medList: newMedList})
    }
  }

  generateMedSelectList() {
    var div = null;
    div = this.drugOptions.map((med) => <CheckBox key={med.value} id={'drug' + med.value} checked={this.state.medList.includes(med)} label={med.label} onChange={() => this.toggleMed(med)}/>)
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
    var today = new Date();

    var dose = {
      key: this.state.keyMax + 1,
      med: medIndex,
      time: null,
      nPills: 0,
      pillDose: 0,
      dateEntered: ((today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear())
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
    if (val.target.valueAsNumber > dosesOfDrug.length) {
      this.initDose(med);
    } else {
      this.deleteDose(dosesOfDrug[dosesOfDrug.length - 1].key)
    }
  }

  generateDoseDayInput() {
    var div = null;
    div = this.state.medList.map((med) => <Box direction={'column'} key={'pdaybox' + med.value}>
      <Paragraph>{med.label}</Paragraph>
      <NumberInput id={'pday' + med.label} min={0} name={'pday' + med.value} value={this.state.doseList.filter(dose => dose.med === med.value).length} step={1} onChange={(val) => this.updateDoseCount(val)}></NumberInput>
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
      div = this.state.medList.map((med, index) => <RegimenEntry3 key={index} medIndex={med.value} doses={this.state.doseList.filter(dose => dose.med === med.value)} updateDose={this.updateDose}></RegimenEntry3>)
      return (<Box>{div}</Box>);
    } else {
      return div;
    }
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

  doseComplete(dose) {
    return !(dose.time === null || (dose.pillDose === 0 || dose.nPills === 0))
  }

  stepComplete() {
    switch (this.state.step) {
      case 0:
        return this.state.medList.length > 0;
      case 2:
        return this.state.doseList.every(this.doseComplete)
      default:
        return true;
    }
  }

  handleNextClick() {
    if(this.state.step === 3)  {
      document.location.hash = '/home'
    }
    else {
    if (this.stepComplete()) {
      this.setState({showCompNotification: false})
      this.nextStep();
    } else {
      var newNotificationText = null;
      switch (this.state.step) {
        case 0:
          newNotificationText = 'Please select a medication before continuing.';
          break;
        case 2:
          newNotificationText = 'Please fill in all information before continuing.';
          break;
        default:
          break;
      }
      this.setState({showCompNotification: true, continueNotificationText: newNotificationText})
    }
}
  }

  render() {
    return (<div>
      <Section className={'page-title'} pad={'medium'}>
        <h1 >Medication Entry</h1>
        <Paragraph>In this page, you will enter all the information about your pain medications, including how much you take and when.</Paragraph>
      </Section>

      <Columns justify={'start'} masonry={true} maxCount={2}>
        <Box size={'xlarge'}>
          {
            this.state.showCompNotification
              ? <Notification message={this.state.continueNotificationText} size='small' status='critical'/>
              : null
          }

          <Animate visible={this.state.step === 0} enter={{
              "animation" : "fade",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>

            <Box justify={'start'} margin={'medium'}>
              <Title>
                Select All Your Medications
              </Title>
              <Paragraph>If you take multiple opioid medications, please check each of them.</Paragraph>
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
              <Title>Enter How many times you take each medication per day</Title>
              {this.generateDoseDayInput()}
            </Box>
          </Animate>
          <Animate visible={this.state.step === 2} enter={{
              "animation" : "fade",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>
            <Box justify={'start'} margin={'medium'}>
              <Title>Enter specifics of each dose:</Title>
              <Box>
                {this.generateRegEntryCards()}
              </Box>
            </Box>
          </Animate>
          <Animate visible={this.state.step === 3} enter={{
              "animation" : "fade",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>
            <Box justify={'start'} margin={'medium'}>
              <MedSummary doseList={this.state.doseList} medList={this.state.medList} updateable={true} updateDose={this.updateDose}></MedSummary>

            </Box>
          </Animate>
          <Box direction={'row'} pad={'medium'} justify={'between'} basis={'full'}>
            <Button onClick={() => this.lastStep()} label={'Back'}></Button>
            <Button onClick={() => this.handleNextClick()} label={this.state.step < 3 ? 'Next' : 'Done'}></Button>
          </Box>
        </Box>

      </Columns>

    </div>);
  }
}
