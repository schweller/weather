import React, { useEffect, useRef, useState } from 'react'
import { API_BASE } from '../../constants'

import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'

import axios from 'axios'

export const useFetchCountries = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    async function fetchCountries() {
      const countries = await axios(`${API_BASE}/countries`)
      setCountries(countries.data)
    }
    
    fetchCountries()
  }, [])

  return { countries, setCountries }
}

export const CountriesSelect = ({country, handleChange, classes}) => {
  const { countries } = useFetchCountries()
  const inputLabel = useRef(null)

  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
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