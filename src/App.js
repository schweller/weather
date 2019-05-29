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

const ShowWeather = ({data}) => {
  if (!data) return null
  const { name } = data
  return (
    <div>
      {`${data.weather[0].description} in ${name}`}
    </div>
  )
}

const useWeatherFetch = (country, subdivision) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    if (subdivision) {
      const fetchWeather = async () => {
        const weather = await axios(`http://localhost:9000/weather/${country}/${subdivision}`)
        console.log(weather)
        setWeather(weather.data)
      }
      fetchWeather()
    }
  }, [subdivision])
  return weather
}

const Weather = () => {
  const classes = useStyles()
  const inputLabel = useRef(null)

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [subdivisions, setSubdivisions] = useState([])
  const [subdivision, setSubdivision] = useState('')

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
      const fetchSubdivisions = async () => {
        const states = await axios(`http://localhost:9000/countries/subdivisions/${country}`)
        console.log(states.data.RestResponse.result)
        setSubdivisions(states.data.RestResponse.result)
      }
      fetchSubdivisions()
    }
  }, [country])

  const weather = useWeatherFetch(country, subdivision)

  const [labelWidth, setLabelWidth] = useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleCountry = event => setCountry(event.target.value)
  const handleSubdivision = event => setSubdivision(event.target.value)

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
        <Grid item xs={12}>
          <FormControl variant="outlined" className={classes.formControl} disabled={subdivisions.length===0}>
            <InputLabel ref={inputLabel} htmlFor="field-subdivisions">
              Subdivisions
            </InputLabel>
            <NativeSelect
              value={subdivision}
              onChange={handleSubdivision}
              input={<OutlinedInput labelWidth={labelWidth} name="field-subdivisions" id="subdivisions" />}
            >
              <option value=""/>
              {
                subdivisions.length > 0 &&
                subdivisions.map((sub, index) => {
                  return <option key={index} value={sub.name}>{sub.name}</option>
                })
              }
            </NativeSelect>
          </FormControl> 
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
