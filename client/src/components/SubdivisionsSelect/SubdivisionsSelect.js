import React, { useEffect, useRef, useState } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import axios from 'axios'

const useFetchSubdivisions = (country) => {
  const [subdivisions, setSubdivisions] = useState([])

  useEffect(() => {
    if (country !== '') {
      const fetchSubdivisions = async () => {
        const states = await axios(`http://localhost:9000/api/countries/subdivisions/${country}`)
        setSubdivisions(states.data)
      }
      fetchSubdivisions()
    }
  }, [country])
  
  return subdivisions
}

export const SubdivisionsSelect = ({subdivision, country, handleChange, classes}) => {
  const subdivisions = useFetchSubdivisions(country)
  const inputLabel = useRef(null)

  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

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