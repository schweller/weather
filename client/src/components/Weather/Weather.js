import React, {useEffect, useState} from 'react'
import { API_BASE } from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import CountriesSelect from '../CountriesSelect'
import SubdivisionsSelect from '../SubdivisionsSelect'

import axios from 'axios'

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

const useWeatherFetch = (country, subdivision) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    if (subdivision) {
      const fetchWeather = async () => {
        const result = await axios(`${API_BASE}/weather/${country}/${subdivision}`)
          .then(response => response.data)
          .catch(error => handleError(error))
        setWeather(result)
      }
      fetchWeather()
    }
  }, [subdivision])

  return weather
}

export const Weather = () => {
  const classes = useStyles()
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
            handleChange={handleCountry}
            classes={classes}
          />
        </Grid>
        <Grid item xs={12}>
          <SubdivisionsSelect 
            country={country} 
            subdivision={subdivision}
            handleChange={handleSubdivision}
            classes={classes}
          />
          { 
            weather ? 
              weather.error ? 
              <Typography variant="h4">{weather.error}</Typography> 
              : <Typography variant="h4">{weather}</Typography>
            : null 
          }
        </Grid>
      </Grid>

    </Container>
  )
}