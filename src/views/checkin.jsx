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
import CheckBox from 'grommet/components/CheckBox';
import Title from 'grommet/components/Title';
import Animate from 'grommet/components/Animate';
import Columns from 'grommet/components/Columns';
import Down from 'grommet/components/icons/base/Down';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Label from 'grommet/components/Label';
import Tabletop from 'tabletop';

class Checkin extends React.Component {
  constructor(props) {
    super(props);
    var context = this;
    var fbData = Tabletop.init({key: 'https://docs.google.com/spreadsheets/d/19CJcyEiSPD4g7boOx6Xk8e6rV9NrJeptqMo-v-uVIzE/edit?usp=sharing', callback: this.readFBDataHelper, simpleSheet: true, callbackContext: context})
    this.state = {
      showVid: false,
      continueTaper: 0,
      fbText: null,
      fbSwitch: 0,
      fbShow: null,
      showDoseEditor: false
    }
    this.setFeedbackSwitch = this.setFeedbackSwitch.bind(this);
    this.toggleCustomFeedback = this.toggleCustomFeedback.bind(this);

  }

  readFBDataHelper(data, tabletop) {
    var initFBShow = new Array(data.length);
    initFBShow = initFBShow.fill(false);
    this.setState({fbText: data, fbShow: initFBShow});
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
                  <Paragraph>{fb.feedback.split("\\n").map((p,key)=>{return(<span key={key}>{p}<br/></span>)})}</Paragraph>
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


  render() {
    return (<div>
      <Box pad={'medium'}>
        <h1>Check In</h1>
        <Section>
          <Paragraph>This is the medication regimen that was most recently recommended to you:</Paragraph>
          <Box align='start' pad='medium' colorIndex='light-2' className={'gen-card'} alignContent={'stretch'}>
            <Label>
              From your last check in on 9/9/17:</Label>
            <List className={'home-medlist'}>
              <ListItem justify={'between'}>
                <b>Oxycodone</b>
                <span>5mg at 8AM</span>
              </ListItem>
              <ListItem justify={'between'}>
                <span></span>
                <span>5mg at 8PM</span>
              </ListItem>
              <ListItem justify={'between'}>
                <b>Hydromorphone</b>
                <span>25mg at 10AM</span>
              </ListItem>
            </List>
            <Box alignContent={'end'} alignSelf={'end'} flex={true} margin={'medium'}>
              <Button label={'Update Regimen'} href={'/taper/#/med_entry3'} primary={true} plain={true}></Button>
            </Box>
          </Box>
          <Paragraph>This regimen is what I am taking now.</Paragraph>

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
          <Paragraph>
            Do you have any concerns about continuing to slowly taper your opioid medications?</Paragraph>
          <Box direction={'row'}>
            <Button label={'No'} onClick={() => this.setFeedbackSwitch(1)}></Button>
            <Button label={'Yes'} onClick={() => this.setFeedbackSwitch(2)}></Button>
          </Box>
          {this.renderFeedback()}

        </Section>
      </Box>
    </div>);
  }
}

export default Checkin;
