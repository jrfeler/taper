import React from 'react';
import Component from 'react';
import * as MedData from '../med_data.js'
import Paragraph from 'grommet/components/Paragraph';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article'

export default class MedSummary extends React.Component {
  constructor(props) {
    super(props);
    this.drugNames = MedData.drugData;
    this.doseData = MedData.doseData;
    this.state = {
      doseList: this.props.doseList,
      medList: this.props.medList,
      showDoseUpdater: false
    }
  }

  toggleDoseUpdater() {
    this.setState({
      showDoseUpdater: !this.state.showDoseUpdater
    })
  }

  render() {
    var div = (<Box className={'gen-card'} pad={'medium'}>
      {
        this.state.medList.map((med, index) => <div key={index}>
          <Paragraph>{med.label}</Paragraph>
          <List className={'home-medlist'}>
            {
              this.state.doseList.filter(dose => dose.med === med.value).map((dose) => <ListItem key={dose.key} onClick={this.props.updateable
                  ? () => this.toggleDoseUpdater()
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
                <Paragraph>
                  will show interface to change values</Paragraph>
              </Article>
            </Layer>
          : null
      }
    </Box>);

    return <Box>{div}</Box >;

  }

}
