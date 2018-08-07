import React from 'react';
import Component from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import NumberInput from 'grommet/components/NumberInput';
import Layer from 'grommet/components/Layer';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Animate from 'grommet/components/Animate';
import Columns from 'grommet/components/Columns';
import Down from 'grommet/components/icons/base/Down';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Label from 'grommet/components/Label';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Tabletop from 'tabletop';
import MedSummary from '../components/MedSummary.jsx';
import RadioButton from 'grommet/components/RadioButton';

import * as MedData from '../med_data.js'

class Checkin extends React.Component {
  constructor(props) {
    super(props);
    var context = this;
    var fbData = Tabletop.init({key: 'https://docs.google.com/spreadsheets/d/19CJcyEiSPD4g7boOx6Xk8e6rV9NrJeptqMo-v-uVIzE/edit?usp=sharing', callback: this.readFBDataHelper, simpleSheet: true, callbackContext: context})
    var dummyDoseList = [{
      key: 1,
      med: 1,
      time: '8 am',
      nPills: 2,
      pillDose: 10
    }, {
      key: 2,
      med: 2,
      time: '8 pm',
      nPills: 2,
      pillDose: 10
    }];
    var dummyMedList = [{value:1,label:'Hydromorphone'},{value:2,label:'Oxycodone'}];

    this.state = {
      showVid: false,
      continueTaper: 0,
      fbText: null,
      fbSwitch: 0,
      fbShow: null,
      showDoseEditor: false,
      step: 0,
      doseList: dummyDoseList,
      medList: dummyMedList,
      taperDose: null,
      taperRate: -1,
      pFBText: MedData.positiveFBText[Math.floor(Math.random()*MedData.positiveFBText.length)]
    }
    this.setFeedbackSwitch = this.setFeedbackSwitch.bind(this);
    this.toggleCustomFeedback = this.toggleCustomFeedback.bind(this);
    this.updateDose = this.updateDose.bind(this);

  }
  nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  }

  lastStep() {
    this.setState({
      step: this.state.step - 1
    });
  }

  readFBDataHelper(data, tabletop) {
    var initFBShow = new Array(data.length);
    initFBShow = initFBShow.fill(false);
    this.setState({fbText: data, fbShow: initFBShow});
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


  setFeedbackSwitch(val) {
    this.setState({fbSwitch: val})
  }

  toggleVidLayer() {
    this.setState({
      showVid: !this.state.showVid
    });
  }


  toggleCustomFeedback(ind) {
    var newState = this.state.fbShow;
    newState[ind] = !newState[ind];
    this.setState({fbShow: newState});
    this.continueTaper();
  }

  customFB() {
    var div = null;
    if (this.state.fbText != null) {
      div = this.state.fbText.map((fb, index) => (<Box key={index} pad={'medium'} className={'gen-card'} onClick={() => this.toggleCustomFeedback(index)}>
        <Box direction={'row'} justify={'between'}>{fb.prompt}
          <Down/></Box>

        {
          this.state.fbShow[index]
            ? <Layer closer={true} onClose={() => this.toggleCustomFeedback(index)}>
                <Article>
                  <div className={'quote-marker left'}>"</div>
                  <Paragraph>{
                      fb.feedback.split("\\n").map((p, key) => {
                        return (<span key={key}>{p}<br/></span>)
                      })
                    }</Paragraph>
                  <div className={'quote-marker right'}>"</div>

                </Article>
              </Layer>
            : null
        }
      </Box>))
    }

    return (<Box>
      <Paragraph>Which of the following most concerns you about tapering your opioids?</Paragraph>
      <Columns size={'medium'} justify={'start'}>
        {div}
      </Columns>
    </Box>);

  }



  renderFeedback() {
    switch (this.state.fbSwitch) {
      case 0:
        return null;
      case 1:
        return (<Box>
          <Paragraph>OK, according to your tapering plan, you should now decrease your dose to
            <b>
              15mg
            </b>
            each day.</Paragraph>
          <Paragraph>
            Other veterans have done very well decreasing by this amount and we think you will too. You shouldn’t note any problems lowering your dose by this amount. We hope you are benefitting from the wide variety of resources included in the Taper Coach. We will check in with you again in 2 weeks.
          </Paragraph>
        </Box>)
      case 2:
        return this.customFB();
      default:
        return null;
    }

  }

  toggleCustomFeedback(ind) {
    var newState = this.state.fbShow;
    newState[ind] = !newState[ind];
    this.setState({fbShow: newState});
  }

  setTaperDose(val) {
    this.setState({taperDose: val});
  }

  setTaperRate(val) {
    this.setState({taperRate: val});
  }

  generateTaperSelector() {
    var div = this.state.doseList.map((dose, index) => <RadioButton key={dose.key} id={'dose' + dose.key} checked={this.state.taperDose === dose} label={MedData.drugData[dose.med] + ' at ' + dose.time} onChange={() => this.setTaperDose(dose)}/>)
    return (<Box>{div}</Box>)
  }

  render() {
    return (<div>
      <Box pad={'medium'}>
        <h1>Check In</h1>

        <Animate visible={this.state.step === 0} enter={{
            "animation" : "fade",
            "duration" : 300,
            "delay" : 0
          }} keep={false}>
          <Box>
            <Paragraph>This is the medication regimen that was most recently recommended to you:</Paragraph>
              <MedSummary doseList={this.state.doseList} medList={this.state.medList} updateable={true} updateDose={this.updateDose}></MedSummary>

            </Box>
            <Box alignContent={'end'} alignSelf={'end'}  flex={true} margin={'medium'}>
              <Button label={'This is a correct list of the medications that I am taking now'} icon={<CaretNext/>} onClick={() => this.nextStep()} primary={true} plain={true}></Button>
            </Box>

        </Animate>

        {
          this.state.showVid
            ? <Layer overlayClose={true}>
                <Article>
                  <iframe id="ytplayer" type="text/html" width="500" height="280" src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com" frameBorder="0"></iframe>
                  <Button label={'Close'} primary={true} onClick={() => this.toggleVidLayer()}></Button>
                </Article>
              </Layer>
            : null
        }



        <Animate visible={this.state.step === 1} enter={{
            "animation" : "fade",
            "duration" : 300,
            "delay" : 0
          }} keep={false}>
          <Box>
            <Paragraph>
              Do you have any concerns about continuing to slowly taper your opioid medications?</Paragraph>
            <Box direction={'row'}>
              <Button label={'No'} onClick={() => this.nextStep()}></Button>
              <Button label={'Yes'} onClick={() => this.setFeedbackSwitch(2)}></Button>
            </Box>
            {this.renderFeedback()}
          </Box>
        </Animate>
        <Animate visible={this.state.step === 2} enter={{
            "animation" : "fade",
            "duration" : 300,
            "delay" : 0
          }} keep={false}>
          <Box>
            <Paragraph>Which dose would you like to reduce next?</Paragraph>
            {this.generateTaperSelector()}
            <Paragraph>Would you like to at a slow rate or the slowest rate?</Paragraph>
            <Box>
              <RadioButton id={'taper1'} checked={this.state.taperRate === 1} label={'Slow'} onChange={() => this.setTaperRate(1)}/>
              <RadioButton id={'taper2'} checked={this.state.taperRate === 2} label={'Slower'} onChange={() => this.setTaperRate(2)}/>
            </Box>
            <Button label={'Next'} icon={<CaretNext/>} onClick={()=>this.nextStep()}/>
          </Box>

        </Animate>
        <Animate visible={this.state.step === 3} enter={{
            "animation" : "fade",
            "duration" : 300,
            "delay" : 0
          }} keep={false}>
          <Box>
            <Paragraph>{this.state.pFBText}</Paragraph>
            {this.state.taperDose != null ? <Paragraph>You should reduce your {this.state.taperDose.time} dose of {MedData.drugData[this.state.taperDose.med]} to {this.state.taperDose.nPills * this.state.taperDose.pillDose * .8} mg.</Paragraph> : null}
          </Box>

        </Animate>

      </Box>
    </div>);
  }
}

export default Checkin;
