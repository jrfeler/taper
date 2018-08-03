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
import TextInput from 'grommet/components/TextInput'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'
import CaretNext from 'grommet/components/icons/base/CaretNext';
import * as MedData from '../med_data.js'

export default class Landing extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (<div>
      <Header pad={'medium'}><h1>Taper App</h1></Header>
      <Columns size='medium' maxCount={4} justify='start'>
        <Box align={'start'} pad={'medium'} margin={'medium'} colorIndex='light-2' className={'gen-card'}>
          <h3>New Patient</h3>
          <Button label={'Start'} href={'/taper/#/med_entry3'}></Button>
        </Box>
        <Box align={'start'} pad={'medium'} margin={'medium'} colorIndex='light-2' className={'gen-card'}>
          <h3>Existing Patient</h3>
          <Box direction={'row'}>
            <TextInput id={'patient_id'} name={'patient_id'} placeHolder={'Patient ID'}></TextInput>
            <Button icon={<CaretNext/>} href={'/taper/#/home'}/>
          </Box>
      </Box>
      </Columns>
    </div>)
  }
}
