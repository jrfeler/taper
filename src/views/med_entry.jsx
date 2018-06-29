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
import RegimenEntry from '../components/RegimenEntry.jsx'
import FormField from 'grommet/components/FormField'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'
import * as MedData from '../med_data.js'

export default class MedEntry extends React.Component {
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
      firstMed: -1,
      doseList: [
        []
      ],
      taperPace: -1,
      firstDose: -1,
      taperDoses: [
        []
      ]
    }
    this.medListRend = [];
    this.medListChecks = [];
    this.setDrugChoice = this.setDrugChoice.bind(this);
    this.setDrugDose = this.setDrugDose.bind(this);

  }

  setFirstMed(med) {
    this.medListChecks = this.generateFirstDrugRadio(this.state.medList, med)
    this.setState({firstMed: this.state.medList.indexOf(med), firstDose: -1})
  }

  generateFirstDrugRadio(drugs, selected) {
    var buttons = drugs.map((drug) => <RadioButton key={drug} id={'drug' + drug} value={drug.toString()} label={this.drugNames[drug]} checked={selected === drug} onChange={() => this.setFirstMed(drug)}/>)
    return (<FormField >{buttons}</FormField>)
  };

  setDrugChoice(val) {
    var newMedList = null;
    var newDoseList = this.state.doseList;
    if (!this.state.medList.includes(val)) {
      newMedList = this.state.medList.concat(val);
      if (newMedList.length === 1) {
        newDoseList = [
          [0, 0, 0, 0]
        ];
      } else {
        newDoseList = newDoseList.concat([
          [0, 0, 0, 0]
        ])
      };
    } else {
      newMedList = this.state.medList;
      newDoseList.splice(newMedList.indexOf(val), 1);
      newMedList.splice(newMedList.indexOf(val), 1);
    }
    var newFirstMed = -1;
    var newFirstDose = this.state.firstDose;
    if (newMedList.length === 1) {
      newFirstMed = 0;
    }

    if (newMedList.length >= 1) {
      this.medListRend = newMedList.map((drug, index) => <RegimenEntry key={drug} drugIndex={newMedList[index]} doses={newDoseList[index]} removeDrug={this.setDrugChoice} setDrugDose={this.setDrugDose}></RegimenEntry>);
      if (newMedList.length > 1) {
        this.medListChecks = this.generateFirstDrugRadio(newMedList, null)

      } else {
        this.medListChecks = []
      }
    } else {
      this.medListRend = [];
      this.medListChecks = [];
      newFirstDose = -1;
    }

    this.setState({medList: newMedList, doseList: newDoseList, firstMed: newFirstMed, firstDose: newFirstDose});

  };

  medSelectHandler(e) {
    this.setDrugChoice(e.value.value);
  };

  setDrugDose(med, doses) {
    var newDoseList = this.state.doseList;
    newDoseList[this.state.medList.indexOf(med)] = doses;
    if (this.state.firstMed>-1 && this.state.doseList[this.state.firstMed].filter(dose => dose > 0).length === 1) {
      this.setState({
        firstDose: this.state.doseList[this.state.firstMed].findIndex(dose => dose > 0)
      })
    } else {
      this.setState({firstDose: -1})
    }
    this.setState({doseList: newDoseList});
    this.calculateTaperDoses(this.state.taperPace);
  }
  setFirstDose(dose) {
    this.setState({firstDose: dose})
  }

  firstDoseSelector() {
    var div = null;
    if (this.state.firstMed >= 0 && this.state.doseList[this.state.firstMed].filter(dose => dose > 0).length > 1) {
      div = (<Section>
        <Box pad='medium' justify={'start'}>
          <Title>
            Which dose during the day would you like to taper first?
          </Title>
          <Paragraph>There is no right answer here. If you have trouble sleeping due to pain, you might choose to decrease a dose other than your evening dose first.</Paragraph>
          <FormField>
            <RadioButton id="Morning" label={"Morning"} disabled={this.state.doseList[this.state.firstMed] === 0} onChange={() => this.setFirstDose(0)} checked={this.state.firstDose === 0}></RadioButton>
            <RadioButton id="Noon" label={"Noon"} onChange={() => this.setFirstDose(1)} checked={this.state.firstDose === 1}></RadioButton>
            <RadioButton id="Evening" label={"Evening"} onChange={() => this.setFirstDose(2)} checked={this.state.firstDose === 2}></RadioButton>
            <RadioButton id="Night" label={"Night"} onChange={() => this.setFirstDose(3)} checked={this.state.firstDose === 3}></RadioButton>
          </FormField>
        </Box>
      </Section>)
    };
    return div;
  }
  calculateTaperDoses(speed) {
    var doseSchedule = null;
    var newDose = this.state.doseList[this.state.firstMed].slice(0);
    var k = speed === 1
      ? .9
      : .8;
    doseSchedule = [this.state.doseList[this.state.firstMed].slice(0)];
    for (var i = 0; i < 5; i++) {
      newDose[this.state.firstDose] = newDose[this.state.firstDose] * k;
      var local = newDose.slice(0);
      doseSchedule.push(local);
    }
    this.setState({taperDoses: doseSchedule})
  }

  selectTaperPace(val) {
    this.setState({taperPace: val})
    this.calculateTaperDoses(val);
  }

  taperPaceSelector() {
    var div = null;
    if (this.state.firstDose > -1 && this.state.firstMed > -1) {
      div = (<Section>
        <Box pad='medium' justify={'start'}>
          <Title>
            How fast would you like to taper?
          </Title>
          <Paragraph>Do we have any data comparing rates?
          </Paragraph>
          <Columns>
            <Card contentPad={'medium'} heading={'Slow'} label={'rate'} description={'Doses will decrease by 10% for each step.'} className={'plan-card'} textSize={'small'}>
              <Button label={'Select'} onClick={() => this.selectTaperPace(0)}></Button>
            </Card>
            <Card contentPad={'medium'} heading={'Slower'} label={'rate'} description={'Doses will decrease by 20% for each step.'} className={'plan-card'} textSize={'small'}>
              <Button label={'Select'} onClick={() => this.selectTaperPace(1)}></Button>
            </Card>

          </Columns>
        </Box>
      </Section>)

    }

    return div;
  }

  taperSchedulePrint() {
    var div = null;
    var rows = this.state.taperDoses.map((row, index) => <TableRow key={index}>
      <td>{row[0]}</td>
      <td>{row[1]}</td>
      <td>{row[2]}</td>
      <td>{row[3]}</td>
    </TableRow>);
    if (this.state.taperPace > -1) {
      div = (<Section>
        <Table responsive={false}>
          <thead>
            <tr>
              <th>Morning</th>
              <th>Noon</th>
              <th>Evening</th>
              <th>Night</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </Section>)
    }
    return div;

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
      {
        this.state.medList.length > 0
          ? <Section pad='medium'>
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
      {this.firstDoseSelector()}
      {this.taperPaceSelector()}
      <Paragraph>{this.state.taperPace}, first: {this.state.firstMed}, drugs: {this.state.medList}, doses: {this.state.doseList}</Paragraph>
      <Footer>

        {this.taperSchedulePrint()}
      </Footer>

    </div>);
  }
}
