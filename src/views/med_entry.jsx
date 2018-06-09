import React, {Component} from "react";
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
import RegimenEntry from '../components/RegimenEntry.jsx'
import * as MedData from '../med_data.js'

export default class MedEntry extends Component {
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
      medList: [],
      firstMed: null,
      doseList: []
    }
    this.medListRend = [];
    this.medListChecks = [];
    this.removeDrug = this.removeDrug.bind(this);

  }

  removeDrug(ind) {
    var newState = null;
    if (!this.state.medList.includes(ind)) {
      newState = this.state.medList.concat(ind);
    } else {
      newState = this.state.medList;
      newState.splice(newState.indexOf(ind), 1);
    }
    this.setState({medList: newState});
    if (newState.length >= 1) {
      this.medListRend = newState.map(drug => <RegimenEntry key={drug} drugIndex={drug} removeDrug={this.removeDrug}></RegimenEntry>);
      this.medListChecks = newState.map(drug => <Checkbox key={drug} label={this.drugNames[drug]}/>);
    } else {
      this.medListRend = [];
      this.medListChecks = [];
    };
    if (this.state.medList.length = 1) {
      this.state.firstMed = this.state.medList[0];
    } else {
      this.state.firstMed = null;
    }
  }

  setDrugChoice(val) {
    var newState = null;
    if (!this.state.medList.includes(val.value.value)) {
      newState = this.state.medList.concat(val.value.value);
    } else {
      newState = this.state.medList;

      newState.splice(newState.indexOf(val.value.value), 1);
    }
    this.setState({medList: newState});
    if (newState.length >= 1) {
      this.medListRend = newState.map(drug => <RegimenEntry key={drug} drugIndex={drug} removeDrug={this.removeDrug}></RegimenEntry>);
      this.medListChecks = newState.map(drug => <CheckBox key={drug} label={this.drugNames[drug]}/>);
    } else {
      this.medListRend = [];
      this.medListChecks = [];
    };
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
          <Select placeHolder={'Click to Select Medications'} options={this.drugOptions} value={this.state.medList} onChange={this.setDrugChoice.bind(this)}/>
        </Box>
      </Section>
      {
        this.state.medList.length > 0
          ? <Section >
              <Columns pad='medium'>
                {this.medListRend}
              </Columns>
            </Section>
          : null
      }
      {
        this.state.medList.length > 1
          ? <Section>

              <Box pad='medium' justify={'start'}>
                <Title>
                  Which medication would you like to taper first?
                </Title>
                <Paragraph>We recommend beginning with long-acting medications.</Paragraph>
                {this.medListChecks}

              </Box>
            </Section>
          : null
      }
    {this.state.medList.length > 1
        ?
      <Section >
        <Box pad='medium' justify={'start'}>
          <Title>
            How fast would you like to taper?
          </Title>
          <Paragraph>Faster schedules may be more difficult but will end sooner.</Paragraph>
          <Columns>
            <Card contentPad={'medium'} heading={'Fast'} label={'rate'} description={'Doses will decrease by 10% for each step.'} className={'plan-card'} textSize={'small'}>
              <Button label={'Select'}></Button>
            </Card>
            <Card contentPad={'medium'} heading={'Slow'} label={'rate'} description={'Doses will decrease by 20% for each step.'} className={'plan-card'} textSize={'small'}>
              <Button label={'Select'}></Button>
            </Card>

          </Columns>

        </Box>
      </Section>
      :null}
      <Footer>
        Filler Text
      </Footer>

    </div>);
  }
}
