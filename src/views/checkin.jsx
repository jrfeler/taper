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

class Checkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVid: false,
      continueTaper: 0,
      fbShow: [false, false, false, false, false]
    }
    this.continueDiv = null;
    this.toggleFeedback = this.toggleFeedback.bind(this);
  }
  toggleLayer() {
    this.setState({
      showVid: !this.state.showVid
    });
  }
  continueTaper(val) {
    switch (val) {
      case 0:
        this.continueDiv = null;
        break;
      case 1:
        this.continueDiv = <Box>
          <Paragraph>OK, according to your tapering plan, you should now decrease your dose to
            <b>
              15mg
            </b>
            each day.</Paragraph>
          <Paragraph>
            Other veterans have done very well decreasing by this amount and we think you will too. You shouldn’t note any problems lowering your dose by this amount. We hope you are benefitting from the wide variety of resources included in the Taper Coach. We will check in with you again in 2 weeks.
          </Paragraph>
        </Box>;
        break;
      case 2:
        this.continueDiv = <Box>
          <Paragraph>Which of the following most concerns you about tapering your opioids?</Paragraph>
          <Box>
            <CheckBox label={'I am worried about having more pain.'} checked={this.state.fbShow[0]} onChange={() => this.toggleFeedback(0)}></CheckBox>
            <CheckBox label={'I am worried about having withdrawal symptoms.'} checked={this.state.fbShow[1]} onChange={() => this.toggleFeedback(1)}></CheckBox>
            <CheckBox label={'I am worried that I will not be able to function in daily life or work'} checked={this.state.fbShow[2]} onChange={() => this.toggleFeedback(2)}></CheckBox>
            <CheckBox label={'I am worried about having more cravings.'} checked={this.state.fbShow[3]} onChange={() => this.toggleFeedback(3)}></CheckBox>
            <CheckBox label={'I do not think that the alternatives will wor.'} checked={this.state.fbShow[4]} onChange={() => this.toggleFeedback(4)}></CheckBox>
          </Box>
          <Box>
            {
              this.state.fbShow[0]
                ? <Layer>
                    <Article>
                      <Paragraph>Pain is something that many Veterans deal with on a daily basis and the concern that you might have *more* pain that might make things worse for you is understandable. The good news is that most Veterans tell us when they reduce their opioids, especially at a slow rate, their pain is not worse at all. Many say that because the pain is no worse, but other things like their mental clarity and their mood are better, they overall feel much better. Some even say that even their pain is better on decreased doses of opioids. This may sound strange but in fact there are new studies showing that long-term opioids can make pain worse.</Paragraph>
                      <Button onClick={() => this.toggleFeedback(0)} label={'Close'}></Button>
                    </Article>
                  </Layer>
                : null
            }
            {
              this.state.fbShow[1]
                ? <Layer>
                    <Article>
                      <Paragraph>Over time, the body adapts to opioid medications so that if you reduce them rapidly, withdrawal symptoms are likely. However, if you reduce the dose of opioids gradually, the body can make new adaptations to the lower doses and withdrawal symptoms generally are extremely mild or absent.

                      </Paragraph>
                      <Paragraph>Veteran #1: “If you’ve experienced withdrawal symptoms before, it’s understandable that you’d be worried about going through that again. But the good news is, if you go slow enough with the taper – like you are doing – withdrawal symptoms are extremely unlikely. I’ll be honest, I didn’t even notice the medication was being lowered. Interestingly, my pain wasn’t even worse. At the end of the whole process, I just overall felt better – less sluggish than when I was on the medications.”
                      </Paragraph>
                      <Button onClick={() => this.toggleFeedback(1)} label={'Close'}></Button>
                    </Article>
                  </Layer>

                : null
            }
            {
              this.state.fbShow[2]
                ? <Layer>
                    <Article>
                      <Paragraph>Lots of people feel that it is the medication that is keeping you functioning so if you lower the medication, your functioning will get worse. In fact, people usually function better off of opioids. You can check out our tips (links to resource page) on how to manage your pain in LIMIT. Also, it may help you to listen to some other veterans’ experiences.
                      </Paragraph>
                      <Button onClick={() => this.toggleFeedback(2)} label={'Close'}></Button>
                    </Article>
                  </Layer>
                : null
            }
            {
              this.state.fbShow[3]
                ? <Layer>
                    <Article>
                      <Paragraph>Craving means you are preoccupied with the thought of getting more medication or being able to take medication right away. This is another problem Veterans can encounter when they reduce the dose of their medication too quickly. To avoid craving, just like to avoid withdrawal, the key is to reduce opioid medication gradually. The other important strategy to reduce or avoid craving is to have other activities and stay busy so that the thoughts of taking the next dose of medication are less strong.</Paragraph>
                      <Button onClick={() => this.toggleFeedback(3)} label={'Close'}></Button>
                    </Article>
                  </Layer>
                : null
            }
            {
              this.state.fbShow[4]
                ? <Layer>
                    <Article>
                      <Paragraph>A lot of Veterans feel like they’ve tried most everything already. A couple things to consider: You’re likely at a different place now – a different mindset, a different set of life circumstances – than you were when you tried some of those other things. Another try is probably worth a go! Also, there are new approaches coming on the scene all the time. Click here (links to page describing non-pharmacologic options at the VA – by site) to see some of the options available at the VA. Click on the XX to hear about how other Veterans dealt with this issue.</Paragraph>
                      <Button onClick={() => this.toggleFeedback(4)} label={'Close'}></Button>
                    </Article>
                  </Layer>
                : null
            }

          </Box>
        </Box>;
        break;
      default:
        this.continueDiv = null;
        break;
    }
    this.setState({continueTaper: val});
  }

  toggleFeedback(ind) {
    var newState = this.state.fbShow;
    newState[ind] = !newState[ind];
    this.setState({fbShow: newState});
  }

  render() {
    return (<div>
      <Box pad={'medium'}>
        <h1>Check In</h1>
        <Section>
          <Paragraph>How many
            <b>
              Oxycodone
            </b>
            tablets are you taking each day? Add up all of the tablets that you are take during the day.</Paragraph>
          <Box direction={'row'} justify={'between'}>
            <NumberInput defaultValue={6}></NumberInput>
            <Button onClick={() => this.toggleLayer()} label={'I am not sure.'}></Button>
          </Box>
          {
            this.state.showVid
              ? <Layer overlayClose={true}>
                  <Article>
                    <iframe id="ytplayer" type="text/html" width="500" height="280" src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com" frameBorder="0"></iframe>
                    <Button label={'Close'} primary={true} onClick={() => this.toggleLayer()}></Button>
                  </Article>
                </Layer>
              : null
          }
          <Paragraph>
            Do you have any concerns about continuing to slowly taper your opioid medications?</Paragraph>
          <Button label={'No'} onClick={() => this.continueTaper(1)}></Button>
          <Button label={'Yes'} onClick={() => this.continueTaper(2)}></Button>
          {this.continueDiv}

        </Section>
      </Box>
    </div>);
  }
}

export default Checkin;
