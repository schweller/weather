import React, { useEffect, useRef, useState } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import axios from 'axios'

const useFetchCountries = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await axios('http://localhost:9000/countries')
      setCountries(countries.data)
    }
    fetchCountries()
  }, [])

  return countries
}

export const CountriesSelect = ({country, handleChange, classes}) => {
  const countries = useFetchCountries()
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