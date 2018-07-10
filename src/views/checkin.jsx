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

class Checkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVid: false,
      continueTaper: 0,
      fbSwitch: 0,
      fbShow: [false, false, false, false, false],
      showDoseEditor: false
    }
    this.setFeedbackSwitch = this.setFeedbackSwitch.bind(this);
    this.toggleCustomFeedback = this.toggleCustomFeedback.bind(this);
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
    return (<Box>
      <Paragraph>Which of the following most concerns you about tapering your opioids?</Paragraph>
      <Columns size={'medium'} justify={'start'}>
        <Box pad={'medium'} className={'gen-card'} onClick={() => this.toggleCustomFeedback(0)}>
          <Box direction={'row'} justify={'between'}>I am worried about having more pain.
            <Down/></Box>

          <Animate visible={this.state.fbShow[0]} enter={{
              "animation" : "slide-down",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>
            <Article>
              <Paragraph>Pain is something that many Veterans deal with on a daily basis and the concern that you might have
                <b>more</b>ß pain that might make things worse for you is understandable. The good news is that most Veterans tell us when they reduce their opioids, especially at a slow rate, their pain is not worse at all. Many say that because the pain is no worse, but other things like their mental clarity and their mood are better, they overall feel much better. Some even say that even their pain is better on decreased doses of opioids. This may sound strange but in fact there are new studies showing that long-term opioids can make pain worse.</Paragraph>
            </Article>
          </Animate>
        </Box>

        <Box pad={'medium'} className={'gen-card'} onClick={() => this.toggleCustomFeedback(1)}>
          <Box direction={'row'} justify={'between'}>I am worried about having withdrawal symptoms.
            <Down/></Box>

          <Animate visible={this.state.fbShow[1]} enter={{
              "animation" : "slide-down",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>
            <Article>
              <Paragraph>Veteran #1: “If you’ve experienced withdrawal symptoms before, it’s understandable that you’d be worried about going through that again. But the good news is, if you go slow enough with the taper – like you are doing – withdrawal symptoms are extremely unlikely. I’ll be honest, I didn’t even notice the medication was being lowered. Interestingly, my pain wasn’t even worse. At the end of the whole process, I just overall felt better – less sluggish than when I was on the medications.”</Paragraph>
            </Article>
          </Animate>
        </Box>

        <Box pad={'medium'} className={'gen-card'} onClick={() => this.toggleCustomFeedback(2)}>
          <Box direction={'row'} justify={'between'}>I am worried that I will not be able to function in daily life or work.<Down/></Box>

          <Animate visible={this.state.fbShow[2]} enter={{
              "animation" : "slide-down",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>
            <Article>
              <Paragraph>Lots of people feel that it is the medication that is keeping you functioning so if you lower the medication, your functioning will get worse. In fact, people usually function better off of opioids. You can check out our tips (links to resource page) on how to manage your pain in LIMIT. Also, it may help you to listen to some other veterans’ experiences.
              </Paragraph>
            </Article>
          </Animate>
        </Box>
        <Box pad={'medium'} className={'gen-card'} onClick={() => this.toggleCustomFeedback(3)}>
          <Box direction={'row'} justify={'between'}>I am worried about having more cravings.<Down/></Box>

          <Animate visible={this.state.fbShow[3]} enter={{
              "animation" : "slide-down",
              "duration" : 300,
              "delay" : 0
            }} keep={false}>
            <Article>
              <Paragraph>Craving means you are preoccupied with the thought of getting more medication or being able to take medication right away. This is another problem Veterans can encounter when they reduce the dose of their medication too quickly. To avoid craving, just like to avoid withdrawal, the key is to reduce opioid medication gradually. The other important strategy to reduce or avoid craving is to have other activities and stay busy so that the thoughts of taking the next dose of medication are less strong.</Paragraph>
            </Article>
          </Animate>
        </Box>
        <Box pad={'medium'} className={'gen-card'} onClick={() => this.toggleCustomFeedback(4)}>
          <Box direction={'row'} justify={'between'}>I do not think that the alternatives will work.<Down/></Box>

        </Box>

      </Columns>
      <Box>

        {
          this.state.fbShow[4]
            ? <Layer closer={true} onClose={() => this.toggleCustomFeedback(4)}>
                <Article>
                  <div className={'quote-marker left'}>"</div>
                  <Paragraph>A lot of Veterans feel like they’ve tried most everything already. A couple things to consider: You’re likely at a different place now – a different mindset, a different set of life circumstances – than you were when you tried some of those other things. Another try is probably worth a go! Also, there are new approaches coming on the scene all the time. Click here (links to page describing non-pharmacologic options at the VA – by site) to see some of the options available at the VA. Click on the XX to hear about how other Veterans dealt with this issue.</Paragraph><div className={'quote-marker right'}>"</div>

                </Article>
              </Layer>
            : null
        }

      </Box>
    </Box>)
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

  toggleDoseEditor() {
    this.setState({showDoseEditor: !this.state.showDoseEditor})
  }

  render() {
    return (<div>
      <Box pad={'medium'}>
        <h1>Check In</h1>
        <Section>
          <Paragraph>This is the medication regimen that was most recently recommended to you:</Paragraph>
          <Box align='start' pad='medium' colorIndex='light-2' className={'gen-card'} alignContent={'stretch'}>
            <Label>
              From your last check in on 9/9/99:</Label>

            <List className={'home-medlist'} onClick={() => this.toggleDoseEditor()}>
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
              <Button label={'Update Regimen'} href={'/med_entry2'} primary={true} plain={true}></Button>
            </Box>

          </Box>
          {
            this.state.showDoseEditor
              ? <Layer closer={true} onClose={() => this.toggleDoseEditor()}>
              <Article pad={'medium'}>
                <Title>Oxycodone</Title>
                <Paragraph>Enter new dose:</Paragraph>
                <NumberInput defaultValue={10}></NumberInput>
              </Article>
            </Layer>
              : null
          }

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
