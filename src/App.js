import React, {useEffect, useRef, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
  import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import axios from 'axios'
import './App.css';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}))

const Weather = () => {
  const classes = useStyles()
  const inputLabel = useRef(null)

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await axios('http://localhost:9000/countries')
      setCountries(countries.data)
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    if (country !== '') {
      console.log(country)
      const fetchStates = async () => {
        const states = await axios(`http://localhost:9000/countries/subdivisions/${country}`)
        console.log(states)
      }
      fetchStates()
    }
  }, [country])

  const [labelWidth, setLabelWidth] = useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleCountry = event => setCountry(event.target.value)

  return (
    <Container maxWidth="xs">
      <CssBaseline/>
      <Typography variant="h1" align="center">Weather</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="field-country">
              Country
            </InputLabel>
            <NativeSelect
              value={country}
              onChange={handleCountry}
              input={<OutlinedInput labelWidth={labelWidth} name="field-country" id="country" />}
            >
              <option value=""/>
              {countries.length > 0 && 
               countries.map((country, index) => {
                return <option key={index} value={country.alpha3Code}>{country.name}</option>
              })}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>

    </Container>
  )
}

function App() {
  return (
    <div className="App">
      <Weather/>
    </div>
  );
}

export default App;
