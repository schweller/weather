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

const handleError = ({response}) => {
  return {
    error: response.data.error
  }
}

const ShowWeather = ({data}) => {
  if (data && data.error) {
    return <Typography variant="h4">{data.error}</Typography>
  }

  return <Typography variant="h4">{data}</Typography>
}

const useWeatherFetch = (country, subdivision) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    if (subdivision) {
      const fetchWeather = async () => {
        const result = await axios(`http://localhost:9000/weather/${country}/${subdivision}`)
          .then(response => response.data)
          .catch(error => handleError(error))
        setWeather(result)
      }
      fetchWeather()
    }
  }, [subdivision])
  return weather
}

const SubdivisionsSelect = ({subdivision, country, inputLabel, labelWidth, handleChange}) => {
  const classes = useStyles()
  const [subdivisions, setSubdivisions] = useState([])

  useEffect(() => {
    if (country !== '') {
      const fetchSubdivisions = async () => {
        const states = await axios(`http://localhost:9000/countries/subdivisions/${country}`)
        setSubdivisions(states.data.RestResponse.result)
      }
      fetchSubdivisions()
    }
  }, [country])

  return (
    <FormControl variant="outlined" className={classes.formControl} disabled={subdivisions.length===0}>
      <InputLabel ref={inputLabel} htmlFor="field-subdivisions">
        Subdivisions
      </InputLabel>
      <NativeSelect
        value={subdivision}
        onChange={handleChange}
        input={<OutlinedInput labelWidth={labelWidth} name="field-subdivisions" id="subdivisions" />}
      >
        <option value=""/>
        {
          subdivisions.length > 0 &&
          subdivisions.map((sub, index) => {
            return <option key={index} value={sub.capital}>{sub.name}</option>
          })
        }
      </NativeSelect>
    </FormControl> 
  )
}

const CountriesSelect = ({country, inputLabel, labelWidth, handleChange}) => {
  const classes = useStyles()
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await axios('http://localhost:9000/countries')
      setCountries(countries.data)
    }
    fetchCountries()
  }, [])

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="field-country">
        Country
      </InputLabel>
      <NativeSelect
        value={country}
        onChange={handleChange}
        input={<OutlinedInput labelWidth={labelWidth} name="field-country" id="country" />}
      >
        <option value=""/>
        {countries.length > 0 && 
        countries.map((country, index) => {
          return <option key={index} value={country.alpha3Code}>{country.name}</option>
        })}
      </NativeSelect>
    </FormControl> 
  )
}

const Weather = () => {
  const classes = useStyles()
  const inputLabel = useRef(null)

  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const [country, setCountry] = useState('')
  const [subdivision, setSubdivision] = useState('')

  const weather = useWeatherFetch(country, subdivision)

  const handleCountry = event => setCountry(event.target.value)
  const handleSubdivision = event => setSubdivision(event.target.value)

  return (
    <Container maxWidth="xs">
      <CssBaseline/>
      <Typography variant="h1" align="center">Weather</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CountriesSelect 
            country={country} 
            labelWidth={labelWidth} 
            inputLabel={inputLabel}
            handleChange={handleCountry}
          />
        </Grid>
        <Grid item xs={12}>
          <SubdivisionsSelect 
            country={country} 
            subdivision={subdivision}
            labelWidth={labelWidth} 
            inputLabel={inputLabel}
            handleChange={handleSubdivision}
          />
          <ShowWeather data={weather}/>
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
